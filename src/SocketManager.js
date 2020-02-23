import { io } from "./server.js";
import Events from "./EventBus.js";
import { SET_STATE, REQUEST_STATE, ALARM_ACTIVATED } from "../client/js/action-types.js";

function messageHandler(msg) {
	console.log("Socket message received", msg);
	if (msg instanceof Object && msg.hasOwnProperty('type')) {
		Events.emit(msg.type, msg.payload)
	}
	else {
		console.log("Unsupported message found", msg);
	}
}

function connectionHandler(socket) {
	console.log("Client connected.");
	socket.on('message', messageHandler);
	Events.emit(REQUEST_STATE);
}

function sendState(payload) {
	io.send({ type: SET_STATE, payload })
}

export default function init() {
	Events.on(SET_STATE, sendState);
	Events.on(ALARM_ACTIVATED, sendState);
	io.on('connection', connectionHandler);
}
