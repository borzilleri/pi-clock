import { io } from "./server.js";
import Events from "./EventBus.js";
import { SET_STATE, REQUEST_STATE } from "../shared/action-types.js";

function messageHandler(msg) {
	console.log("Socket message received", msg);
	//TODO: Parse and emit appropriate message.
	Events.emit(msg.type, msg.payload);
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
	io.on('connection', connectionHandler);
}
