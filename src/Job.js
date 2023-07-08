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
		// This is hella silly.
		// Our data is Sunday first, 0-indexed.
		// iso day of week is Monday first, 1-indexed.
		// This corrects the sunday value, which is the only different one.
		let isoWeekdays = this.alarm.weekDays.map(d => d || 7);

		// If this alarm is set to be skipped until a date, calculate that.
		// Be sure the configured date is both set, and not in the past.
		let skipUntil = this.alarm.skipUntil ? moment.unix(this.alarm.skipUntil) : moment();
		if (skipUntil.isBefore()) {
			skipUntil = moment();
		}

		// Initialize our 'next' activation time to our skip until start time,
		// which may just be "now"
		let next = moment(skipUntil);

		// Set the time component of our next activation based on the alarm.
		next.set({ "hour": this.alarm.hour, "minute": this.alarm.minute, "second": 0 });

		let today = next.isoWeekday();

		// Our next activation is today and in the future, so we can just return it.
		if (next.isAfter() && (isoWeekdays.length == 0 || isoWeekdays.includes(today))) {
			return next;
		}

		// Otherwise, we need to find the "next" day this activates
		// First, find the next day-of-week that the alarm should go off.
		let nextDay = (() => {
			// If our weekdays array is empty, we're a one-off, and our next activation is tomorrow.
			if (this.alarm.weekDays.length == 0) {
				return moment().add(1, 'day').isoWeekday();
			}
			for (let i = 0; i < 7; i++) {
				let day = (today + i) % 7;
				if (this.alarm.weekDays.includes(day)) {
					return day;
				}
			}
		})();
		// We know our next activation should be on that day, so set our activation to it.
		next.isoWeekday(nextDay);

		// If the next day is before our skip threshold (which may be just now),
		// it ended up earlier in the week, and we need to bump it forward by one week.
		if ( next.isBefore(skipUntil) ) {
			next.add(1, 'weeks');
		}
		return next;
	}
}

export default Job;
