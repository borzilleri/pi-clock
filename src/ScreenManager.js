import Events from './EventBus.js';
import config from './config.js';
import { exec } from 'child_process';
import { ALARM_ACTIVATED } from '../client/js/action-types.js';


function closeHandler(err) {
	if (err) {
		console.log(`Error activating screen.`, err)
	}
}

function activateScreen(activeState) {
	if (!config.display.enabled) {
		return;
	}
	console.log('screenactivated', config.display.on_command);

	process = exec(config.display.on_command, closeHandler);
	if (!process) {
		throw new Error(`Unable to spawn process: ${CMD_EXE}`)
	}
}

function Init() {
	Events.on(ALARM_ACTIVATED, activateScreen);
}

export default {
	Init
}
