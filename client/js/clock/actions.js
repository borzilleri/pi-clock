//@ts-check
import { SERVER_MESSAGE, ALARM_SNOOZE, ALARM_STOP } from '../action-types.js';

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
