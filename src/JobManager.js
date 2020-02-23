import moment from "moment";
import Alarm from "./Alarm.js";
import Job from "./Job.js";
import * as AudioPlayer from "./AudioPlayer.js";
import * as Constants from "../client/js/constants.js";
import * as ActionTypes from "../client/js/action-types.js";
import Events from "./EventBus.js";
import { Settings } from "./Settings.js";

/**
 * @type {Array[Alarm]}
 */
let JOBS = [];
/**
 * @type {Job}
 */
let _active_alarm = undefined;
/**
 * @type {Number}
 */
let _snooze_timeout_id = undefined;
/**
 * @type {Number}
 */
let _snooze_until = undefined;

function jobComparator(reverse) {
	return (a, b) => {
		let order = reverse ? 1 : -1;
		let a_next = a.nextActivation;
		let b_next = b.nextActivation;
		if (a_next < b_next) {
			return -1 * order;
		}
		if (a_next > b_next) {
			return 1 * order;
		}
		return 0;
	}
}

/**
 * @param {Alarm} job
 */
function activationHandler(job) {
	console.log(`Activating Alarm: ${job.id}`);
	_active_alarm = job;
	_snooze_timeout_id = undefined;
	AudioPlayer.PlayAudio(job.alarm.sound);
	Events.emit(ActionTypes.ALARM_ACTIVATED, getState());
}

function completionHanlder(job) {
	console.log(`Completion handler for job: ${job.id}`);
}

async function stopActive() {
	AudioPlayer.StopAudio();
	if (_active_alarm) {
		let activeId = _active_alarm.id;
		console.log(`Stopping alarm: ${activeId}`);
		if (!_active_alarm.alarm.recurring) {
			console.log(`Disabling Alarm: ${activeId}`)
			await Alarm.findOneAndUpdate({ _id: activeId }, { enabled: false });
			removeAlarmJob(activeId);
		}
		_active_alarm = undefined;
	}
	if (_snooze_timeout_id) {
		clearTimeout(_snooze_timeout_id);
		_snooze_timeout_id = undefined;
	}
	dispatchCurrentState();
}

function snoozeActive() {
	// We probably just want to do this regardless of whether there's an active alarm.
	AudioPlayer.StopAudio();
	if (_active_alarm) {
		console.log(`Snoozing alarm: ${_active_alarm.id}`);
		_snooze_until = moment().add(Settings.snooze_duration);
		_snooze_timeout_id = setTimeout(
			() => activationHandler(_active_alarm),
			Settings.snooze_duration.asMilliseconds()
		);
		dispatchCurrentState();
	}
}

function dispatchCurrentState() {
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
	if (_active_alarm) {
		// There's an active (possibly snoozing) alarm.
		state.name = _active_alarm.name;
		if (_snooze_timeout_id) {
			state.status = Constants.STATUS_SNOOZING;
			state.activationTime = _snooze_until.unix();
		}
		else {
			state.status = Constants.STATUS_ACTIVE;
			state.activationTime = 0;
		}
	}
	else if (JOBS.length > 0) {
		// There's an upcoming alarm.
		/**
		 * @type {Job}
		 */
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

/**
 * @param {Alarm} alarm 
 */
function updateAlarmJob(alarm) {
	console.log(`Updating job for alarm: ${alarm._id}`);
	/**
	 * @type {Job}
	 */
	let job = JOBS.find(j => j.id === alarm._id);

	let update = false;
	if (!job && alarm.enabled) {
		console.log("creating new job");
		JOBS.push(new Job(alarm));
		update = true;
	}
	else if (job) {
		console.log("updating job.");
		job.update(alarm);
		update = true;
	}
	if (update) {
		JOBS = JOBS.filter(j => j.alarm.enabled).sort(jobComparator(true))
		dispatchCurrentState();
	}
}

/**
 * @param {String} alarmId 
 */
function removeAlarmJob(alarmId) {
	console.log(`Removing job for alarm: ${alarmId}`);
	let job = JOBS.find(j => j.id === alarmId);
	JOBS = JOBS.filter(j => j.id !== alarmId);
	if (job) {
		job.stop();
	}
}

async function loadAllJobs() {
	await Alarm.find({}).then(list => {
		JOBS = list.filter(a => a.enabled).map(alarm => new Job(alarm)).sort(jobComparator(true));
	})
	console.log(`Loaded ${JOBS.length} jobs.`)
	dispatchCurrentState();
}

export default async function init() {
	Events.on(ActionTypes.ALARM_SNOOZE, snoozeActive);
	Events.on(ActionTypes.ALARM_STOP, stopActive);

	Events.on(ActionTypes.ALARM_UPDATED, updateAlarmJob);
	Events.on(ActionTypes.ALARM_DELETED, removeAlarmJob);

	Events.on(ActionTypes.REQUEST_STATE, dispatchCurrentState);
	Events.on(ActionTypes.ALARM_JOB_ACTIVATED, activationHandler);
	Events.on(ActionTypes.ALARM_JOB_COMPLETED, completionHanlder);

	return await loadAllJobs();
}
