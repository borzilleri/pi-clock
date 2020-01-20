import cron from 'cron';
import Events from './EventBus.js';
import { ALARM_JOB_ACTIVATED, ALARM_JOB_COMPLETED } from '../shared/action-types.js';

class Job {
	cron;
	alarm;
	snoozing = -1;

	constructor(alarm) {
		this.alarm = alarm;
		this.cron = this.initCron(alarm);
	}

	initCron(alarm) {
		return cron.job(
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

	get isSnoozing() {
		return this.snoozing > -1;
	}

	onTick() {
		Events.emit(ALARM_JOB_ACTIVATED, this);
	}

	onComplete() {
		Events.emit(ALARM_JOB_COMPLETED, this);
	}

	update(alarm) {
		// Only update the cron job if the schedule changed.
		if (this.alarm.cronSchedule !== alarm.cronSchedule) {
			console.log(`Updating time for job: ${this.id}`)
			this.cron.setTime(cron.time(alarm.cronSchedule));
		}
		this.alarm = alarm;
	}

	stop() {
		this.cron.stop();
	}
}

export default Job;
