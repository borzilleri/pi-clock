import * as ActionTypes from './action-types.js';

export function sendDebugMessage(payload) {
	return {
		type: ActionTypes.DEBUG_REQUEST,
		payload
	}
}

export function setState(payload) {
	return {
		type: ActionTypes.SET_STATE,
		payload
	}
};

export function snoozeAlarm() {
	return {
		type: ActionTypes.ALARM_SNOOZE
	}
}

export function stopAlarm() {
	return {
		type: ActionTypes.ALARM_FETCHED
	}
}

