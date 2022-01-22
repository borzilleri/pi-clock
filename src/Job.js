import cron from 'cron';
import moment from "moment";
import Events from './EventBus.js';
import Alarm from './Alarm.js';
import { ALARM_JOB_ACTIVATED } from '../client/js/action-types.js';

class Job {
	/**
	 * @type {Alarm}
	 */
	alarm;

	/**
	 * @type {moment.Moment}
	 */
	nextActivation;

	timeoutObj;

	constructor(alarm) {
		this.alarm = alarm;
		this.nextActivation = this.calculateNextActivation();
		this.startTimer();
		console.log(`Alarm Initialized: ${alarm.name}`);
	}

	get id() {
		return this.alarm._id;
	}

	get name() {
		return this.alarm.name;
	}

	get nextActivation() {
		return this.nextActivation;
	}

	get ttlSeconds() {
		return Math.round(moment.duration(this.nextActivation.diff(moment())).asSeconds());
	}

	get ttlMillis() {
		return moment.duration(this.nextActivation.diff(moment())).asMilliseconds();
	}

	startTimer() {
		this.nextActivation = this.calculateNextActivation();
		console.log(`Next activation for ${this.name}: ${this.nextActivation.calendar()}`)
		this.timeoutObj = setTimeout(() => { this.onActivate() }, this.ttlMillis);
		console.log(`Set timeout for ${this.name} to ${this.ttlSeconds} seconds.`)
	}

	onActivate() {
		console.log(this.name);
		Events.emit(ALARM_JOB_ACTIVATED, this);
		if (this.alarm.recurring) {
			this.startTimer();
		}
		else {
			this.nextActivation = null;
		}
	}

	/**
	 * @param {Alarm} alarm 
	 */
	update(newAlarm) {
		let oldAlarm = this.alarm;
		this.alarm = newAlarm;
		if (!this.alarm.enabled) {
			this.stop();
		}
		else if (oldAlarm.hasDifferentSchedule(this.alarm)) {
			// Only update the cron job if the schedule changed.
			console.log(`Updating timer for job: ${this.id}`);
			this.stop();
			this.nextActivation = this.calculateNextActivation();
			this.startTimer();
		}
	}

	stop() {
		clearTimeout(this.timeoutObj);
	}

	/**
	 * 
	 * @param {@Alarm}
	 */
	calculateNextActivation() {
		// Set the time component of the next activation.
		let next = moment().set({ "hour": this.alarm.hour, "minute": this.alarm.minute, "second": 0 });

		// That time is after now, it's our next activation.
		if (next.isAfter()) {
			return next;
		}

		// Otherwise, we need to find the "next" activation of this.
		// First, find the next day-of-week that the alarm should go off.
		let today = moment().isoWeekday();
		let nextDay = (() => {
			// If our weekdays array is empty, we're a one-off, and our next activation is tomorrow.
			if (this.alarm.weekDays.length == 0) {
				return moment().add(1, 'day').isoWeekday();
			}

			for (let i = 1; i++; i <= 7) {
				let day = (today + i) % 7;
				if (this.alarm.weekDays.includes(day)) {
					return day;
				}
			}
		})();
		// We know our next activation should be on that day, so set our activation to it.
		next.isoWeekday(nextDay);

		// If the next day is after today, it's later in the current week, so we're good to go.
		if (nextDay > today) {
			return next;
		} else {
			// Otherwise, add a week, and we're good.
			return next.add(1, 'weeks');
		}
	}
}

export default Job;
