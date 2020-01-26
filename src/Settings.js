import camo from 'camo';
import Events from './EventBus.js';
import { DATABASE_LOADED } from '../client/js/action-types.js';
import moment from 'moment';

class LocalSettings extends camo.Document {
	/**
	 * @type {Number}
	 */
	snooze_duration;

	constructor() {
		super();
		this.snooze_duration = {
			type: Number,
			default: 9
		}
	}
}

class SettingsWrapper {
	/**
	 * @returns {moment.Duration}
	 */
	get snooze_duration() {
		return moment.duration(settingsObj.snooze_duration);
	}
}

let settingsObj = {} //TODO: This is just ugly and hacky. Fix this.

async function loadSettings() {
	let obj = await LocalSettings.findOne({});
	if (!obj) {
		obj = await LocalSettings.create({}).save();
	}
	settingsObj = obj;
}

export function init() {
	Events.on(DATABASE_LOADED, loadSettings);
}

export const Settings = new SettingsWrapper();
