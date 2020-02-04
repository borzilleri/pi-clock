//@ts-check
import { SET_STATE, SERVER_MESSAGE, ALARM_SNOOZE, ALARM_STOP, MODAL_CLOSE } from './action-types.js';

export function setState(payload) {
	return {
		type: SET_STATE,
		payload
	}
};

export function snoozeAlarm() {
	return {
		type: SERVER_MESSAGE,
		payload: {
			type: ALARM_SNOOZE
		}
	}
}

export function stopAlarm() {
	return {
		type: SERVER_MESSAGE,
		payload: {
			type: ALARM_STOP
		}
	}
}
