import { io } from "./server.js";
import Events from "./EventBus.js";
import { SET_STATE, STATE_REQUEST, ALARM_ACTIVATED, SETTINGS_SET } from "../client/js/action-types.js";
import Settings from './Settings.js';

function messageHandler(msg) {
	console.log("Socket message received", msg);
	if (msg instanceof Object && msg.hasOwnProperty('type')) {
		Events.emit(msg.type, msg.payload)
	}
	else {
		console.log("Unsupported message found", msg);
	}
}

function errorHandler(err) {
	console.log("socket.io error", err);
}

function connectionHandler(socket) {
	console.log("Client connected.");
	socket.on('message', messageHandler);
	socket.on('error', errorHandler);
	io.send({ type: SETTINGS_SET, payload: Settings.clientSettings() });
	Events.emit(STATE_REQUEST);
}

function sendState(payload) {
	io.send({ type: SET_STATE, payload })
}

export function InitSocketManager() {
	Events.on(SET_STATE, sendState);
	Events.on(ALARM_ACTIVATED, sendState);
	io.on('connection', connectionHandler);
}
