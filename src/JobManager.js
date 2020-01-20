import moment from "moment";
import Alarm from "./Alarm.js";
import Job from "./Job.js";
import AudioPlayer from "./AudioPlayer.js";
import config from "./config.js";
import * as Constants from "../shared/constants.js";
import * as ActionTypes from "../shared/action-types.js";
import Events from "./EventBus.js";

const SNOOZE_DURATION = moment.duration(config.alarm.snooze_time, 'Seconds');

let JOBS = [];
let ACTIVE;
let SNOOZE_TIMEOUT_ID;

function jobComparator(reverse) {
	return (a, b) => {
		let order = reverse ? 1 : -1;
		let a_next = a.nextActivation();
		let b_next = b.nextActivation();
		if (a_next < b_next) {
			return -1 * order;
		}
		if (a_next > b_next) {
			return 1 * order;
		}
		return 0;
	}
}

function activationHandler(job) {
	console.log(`Activating Alarm: ${job.id}`);
	ACTIVE = job;
	AudioPlayer.Play(job.alarm.sound);
	dispatchCurrentState();
}

function completionHanlder(job) {
	console.log(`Completion handler for job: ${job.id}`);
}

function stopActive() {
	AudioPlayer.Stop();
	ACTIVE = null;
	if (SNOOZE_TIMEOUT_ID) {
		clearTimeout(SNOOZE_TIMEOUT_ID);
	}
	dispatchCurrentState();
}

function snoozeActive() {
	// We probably just want to do this regardless of whether there's an active alarm.
	AudioPlayer.Stop();
	if (ACTIVE) {
		ACTIVE.snoozingUntil = moment().add(SNOOZE_DURATION, 'Seconds');
		dispatchCurrentState();
		SNOOZE_TIMEOUT_ID = setTimeout(SNOOZE_DURATION, () => activationHandler(job));
	}
}

function dispatchCurrentState() {
	console.log("dispatching current state?");
	Events.emit(ActionTypes.SET_STATE, getState());
}

/**
 * {
 * name: string,
 * status: snoozing|active|pending|inactive
 * activationTime: int
 * }
 */
function getState() {
	let state = {};
	if (ACTIVE) {
		// There's an active (possibly snoozing) alarm.
		state.name = ACTIVE.name;
		if (ACTIVE.isSnoozing()) {
			state.status = Constants.STATUS_SNOOZING;
			state.activationTime = ACTIVE.snoozingUntil;
		}
		else {
			state.status = Constants.STATUS_ACTIVE;
			state.activationTime = 0;
		}
	}
	else if (JOBS.length > 0) {
		// There's an upcoming alarm.
		let job = JOBS[0];
		state.name = job.name;
		state.status = Constants.STATUS_PENDING;
		state.activationTime = job.nextActivation;
	}
	else {
		state.status = Constants.STATUS_INACTIVE;
	}
	// There's no active or upcoming alarms.
	console.log("Generated state", state);
	return state;
}

function updateAlarmJob(alarm) {
	console.log(`Updating job for alarm: ${alarm._id}`);
	let job = JOBS.find(j => j.id === alarm._id);
	if (job) {
		job.update(alarm);
		JOBS.sort(jobComparator(true));
		dispatchCurrentState();
	}
}

function removeAlarmJob(alarmId) {
	console.log(`Removing job for alarm: ${alarmId}`);
	let job = JOBS.find(j => j.id === alarmId);
	JOBS = JOBS.filter(j => j.id !== alarmId);
	if (job) {
		this.job.stop();
	}
}

async function loadAllJobs() {
	await Alarm.find().then(list => {
		JOBS = list.filter(a => a.enabled).map(alarm => new Job(alarm)).sort(jobComparator(true));
	})
	dispatchCurrentState();
}

export default function init() {
	Events.on(ActionTypes.ALARM_SNOOZE, snoozeActive);
	Events.on(ActionTypes.ALARM_STOP, stopActive);
	Events.on(ActionTypes.ALARM_UPDATED, updateAlarmJob);
	Events.on(ActionTypes.ALARM_DELETED, removeAlarmJob);
	Events.on(ActionTypes.DATABASE_LOADED, loadAllJobs);
	Events.on(ActionTypes.REQUEST_STATE, dispatchCurrentState);
	Events.on(ActionTypes.ALARM_JOB_ACTIVATED, activationHandler);
	Events.on(ActionTypes.ALARM_JOB_COMPLETED, completionHanlder);
}
