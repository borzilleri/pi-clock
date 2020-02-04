import { all, takeEvery, call, put } from "/vendor/redux-saga-effects.js"
import AlarmClient from '../clients/AlarmClient.js';
import { ALARM_LIST_REQUEST, API_ERROR, ALARM_SAVE_REQUEST, ALARM_SAVE_RESPONSE, ALARM_LIST_RESPONSE, ALARM_DELETE_REQUEST, ALARM_DELETE_RESPONSE } from "../action-types.js";

function* fetchAlarmsSaga() {
	yield takeEvery(ALARM_LIST_REQUEST, fetchAlarmWorker)
}

function* fetchAlarmWorker() {
	try {
		const payload = yield call(AlarmClient.List);
		yield put({ type: ALARM_LIST_RESPONSE, payload });
	}
	catch (e) {
		yield put({ type: API_ERROR, payload: e });
	}
}

function* saveAlarmSaga() {
	yield takeEvery(ALARM_SAVE_REQUEST, saveAlarmWorker);
}

function* saveAlarmWorker(action) {
	try {
		let {id, alarm} = action.payload;
		const payload = yield call(() => AlarmClient.Save(id, alarm));
		yield put({ type: ALARM_SAVE_RESPONSE, payload });
		// TODO: handle 400 errors better here.
	}
	catch (e) {
		yield put({ type: API_ERROR, payload: e });
	}
}

function* deleteAlarmSaga() {
	yield takeEvery(ALARM_DELETE_REQUEST, deleteAlarmWorker);
}

function* deleteAlarmWorker(action) {
	try {

		const payload = yield call(() => AlarmClient.Delete(action.payload));
		yield put({ type: ALARM_DELETE_RESPONSE, payload });
	}
	catch (e) {
		yield put({ type: API_ERROR, payload: e });
	}
}

export default function* saga() {
	yield all([
		fetchAlarmsSaga(),
		saveAlarmSaga(),
		deleteAlarmSaga()
	]);
};
