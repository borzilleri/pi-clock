import * as ActionTypes from './action-types.js';

export function toggleAlarmEnabled(alarm) {
	return updateAlarm({
		_id: alarm._id,
		enabled: !alarm.enabled
	});
}

export function updateAlarm(payload) {
	return {
		type: ActionTypes.ALARM_UPDATE,
		payload
	}
}

export function fetchAlarms() {
	return {
		type: ActionTypes.ALARM_FETCH_ALL
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

