import cron from 'cron';
import Events from './EventBus.js';
import Alarm from './Alarm.js';
import { ALARM_JOB_ACTIVATED, ALARM_JOB_COMPLETED } from '../client/js/action-types.js';

class Job {
	/**
	 * @type {cron.CronJob}
	 */
	cron;
	/**
	 * @type {Alarm}
	 */
	alarm;

	constructor(alarm) {
		this.alarm = alarm;
		this.cron = cron.job(
			alarm.cronSchedule,
			this.onTick,
			this.onComplete,
			true, null, this
		);
	}

	get id() {
		return this.alarm._id;
	}

	get name() {
		return this.alarm.name;
	}

	get nextActivation() {
		return this.cron.nextDates().unix();
	}

	onTick() {
		Events.emit(ALARM_JOB_ACTIVATED, this);
	}

	onComplete() {
		Events.emit(ALARM_JOB_COMPLETED, this);
	}

	/**
	 * @param {Alarm} alarm 
	 */
	update(alarm) {
		if (!alarm.enabled) {
			this.stop();
		}
		else if (this.alarm.cronSchedule !== alarm.cronSchedule) {
			// Only update the cron job if the schedule changed.
			console.log(`Updating time for job: ${this.id} to ${alarm.cronSchedule}`)
			this.cron.setTime(cron.time(alarm.cronSchedule));
			this.cron.start();
		}
		this.alarm = alarm;
	}

	stop() {
		this.cron.stop();
	}
}

export default Job;
