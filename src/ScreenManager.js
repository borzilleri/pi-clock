import Events from './EventBus.js';
import config from './config.js';
import { exec } from 'child_process';
import { ALARM_ACTIVATED } from '../client/js/action-types.js';

import Module from './modules/Module.js';
/**
 * @type {Module}
 */
let screenModule;

function activateScreen(activeState) {
	console.log('Activating Screen');
	screenModule.activateScreen();
}

export function InitScreenManager() {
	let modulePath = `./modules/${config.alarm.module}.js`;
	import(modulePath).then(loadedModule => screenModule = loadedModule.default);
	Events.on(ALARM_ACTIVATED, activateScreen);
}
