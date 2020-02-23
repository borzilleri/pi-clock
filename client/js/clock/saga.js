import { eventChannel } from '/vendor/redux-saga.js';
import { actionChannel, all, take, call, put } from "/vendor/redux-saga-effects.js"
import * as ActionTypes from '../action-types.js';

let socket;
const connect = () => {
	socket = io();
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

/**
 * Listens to events from the clients, and sends them to the server.
 */
function* clientListenerSaga() {
	const requestChannel = yield actionChannel(ActionTypes.SERVER_MESSAGE);
	while (true) {
		const { payload } = yield take(requestChannel);
		yield call(handleRequest, payload);
	}
}

function* handleRequest(payload) {
	socket.send(payload);
}

export default function* saga() {
	yield all([
		serverListenerSaga(),
		clientListenerSaga()
	]);
};
