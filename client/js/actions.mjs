import { ALARM_FETCHED, DEBUG_REQUEST, DEBUG_RESPONSE } from './action-types.mjs';

export function alarmFetched(payload) {
	return {
		type: ALARM_FETCHED,
		payload
	}
}

export function debugResponse(payload) {
	return {
		type: DEBUG_RESPONSE,
		payload
	}
}

export function debugRequest(payload) {
	return {
		type: DEBUG_REQUEST,
		payload
	}
}
