import camo from 'camo';
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

let settingsObj;

async function loadSettings() {
	let obj = await LocalSettings.findOne({});
	if (!obj) {
		obj = await LocalSettings.create({}).save();
	}
	return obj;
}

export async function init() {
	settingsObj = await loadSettings();
	return settingsObj
}

/**
 * @type {SettingsWrapper}
 */
export const Settings = new SettingsWrapper();
