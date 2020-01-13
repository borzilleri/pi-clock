import {eventChannel} from '/vendor/redux-saga.js';
import {actionChannel, all, take, call, put} from "/vendor/redux-saga-effects.js"

import {DEBUG_REQUEST, DEBUG_RESPONSE} from './action-types.mjs';

const wssUrl = "http://localhost:3000"
let socket;
const connect = () => {
	socket = io(wssUrl);
	return new Promise(resolve => {
		socket.on('connect', () => {
			resolve(socket);
		})
	})
}
const createSocketChannel = (socket) => eventChannel(emit => {
	const handler = (data) => emit(data);
	socket.on('message', handler);
	return () => {
		socket.off('message', handler);
	}
});

/**
 * Listens to events from the server and puts them.
 */
function* serverListenerSaga() {
	socket = yield call(connect);
	const socketChannel = yield call(createSocketChannel, socket);
	while (true) {
		const action = yield take(socketChannel);
		yield put(action)
	}
}

function* clientListenerSaga() {
	const requestChannel = yield actionChannel(DEBUG_REQUEST);
	while(true) {
		const {payload} = yield take(requestChannel);
		yield call(handleRequest, payload);
	}
}

function* handleRequest(payload) {
	console.log(`handling request: ${payload}`);
	socket.send({type: 'DEBUG_REQUEST', payload});
}

export default function* saga() {
	yield all([
		serverListenerSaga(),
		clientListenerSaga()
	]);
};
