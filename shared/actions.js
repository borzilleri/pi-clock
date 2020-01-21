import * as ActionTypes from './action-types.js';

export function setState(payload) {
	return {
		type: ActionTypes.SET_STATE,
		payload
	}
};

export function snoozeAlarm() {
	return {
		type: ActionTypes.SERVER_MESSAGE,
		payload: {
			type: ActionTypes.ALARM_SNOOZE
		}
	}
}

export function stopAlarm() {
	return {
		type: ActionTypes.SERVER_MESSAGE,
		payload: {
			type: ActionTypes.ALARM_STOP
		}
	}
}

