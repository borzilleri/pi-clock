import { all, takeEvery, call, put } from "/vendor/redux-saga-effects.js"
import * as ActionTypes from '../action-types.js';
import AlarmClient from '../clients/AlarmClient.js/index.js';

function* fetchAlarmsSaga() {
	yield takeEvery(ActionTypes.ALARM_FETCH_ALL, fetchAlarmWorker)
}

function* fetchAlarmWorker() {
	try {
		const payload = yield call(AlarmClient.List);
		yield put({ type: ActionTypes.ALARM_SET_ALL, payload });
	}
	catch (e) {
		yield put({ type: ActionTypes.API_ERROR, payload: e });
	}
}

function* updateAlarmSaga() {
	yield takeEvery(ActionTypes.ALARM_UPDATE, updateAlarmWorker);
}

function* updateAlarmWorker(action) {
	try {
		const payload = yield call(() => AlarmClient.Update(action.payload));
		yield put({type: ActionTypes.ALARM_SET_ONE, payload});
	}
	catch (e) {
		yield put({ type: ActionTypes.API_ERROR, payload: e });
	}
}

export default function* saga() {
	yield all([
		fetchAlarmsSaga(),
		updateAlarmSaga()
	]);
};
