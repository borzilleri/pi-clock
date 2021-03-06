//@ts-check
import { ALARM_EDIT, ALARM_SAVE_REQUEST, ALARM_LIST_REQUEST, ALARM_DELETE_REQUEST, MODAL_CLOSE, SOUND_FETCH_REQUEST } from '../action-types.js';

const defaultAlarmData = {
	name: "New Alarm",
	sound: null,
	hour: 12,
	minute: 12,
	enabled: true,
	weekDays: []
};

/**
 * @param {Object} payload Alarm object to edit. 
 */
export function editAlarm(payload = defaultAlarmData) {
	return {
		type: ALARM_EDIT,
		payload
	}
}

/**
 * @param {Object} alarm Alarm object to toggle enabled on.
 */
export function toggleAlarmEnabled(alarm) {
	return saveAlarm({ enabled: !alarm.enabled }, alarm._id);
}

/**
 * @param {Object} alarm Alarm object to save.
 * @param {String} id _id of the alarm to save (Optional)
 */
export function saveAlarm(alarm, id = undefined) {
	return {
		type: ALARM_SAVE_REQUEST,
		payload: { id, alarm }
	}
}

/**
 * @param {String} payload _id of the alarm to delete.
 */
export function deleteAlarm(payload) {
	return {
		type: ALARM_DELETE_REQUEST,
		payload
	}
}

export function fetchAlarms() {
	return {
		type: ALARM_LIST_REQUEST
	}
}

export function closeEditor() {
	return {
		type: MODAL_CLOSE
	}
}

export function fetchSounds() {
	return { type: SOUND_FETCH_REQUEST }
}
