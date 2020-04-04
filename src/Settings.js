import camo from 'camo';
import moment from 'moment';
import Events from './EventBus.js';

class LocalSettings extends camo.Document {
	/**
	 * @type {Number}
	 */
	snooze_duration;

	/**
	 * @type {String}
	 */
	default_sound;

	constructor() {
		super();
		this.snooze_duration = {
			type: Number,
			default: 9
		}
		this.default_sound = {
			type: String
		}
		this.volume = {
			type: Number,
			min: 0,
			max: 100,
			default: 75
		}
	}
}

class SettingsWrapper {
	utcOffset = moment().utcOffset();

	/**
	 * @returns {moment.Duration}
	 */
	get snooze_duration() {
		return moment.duration(settingsObj.snooze_duration, 'minutes');
	}

	get default_sound() {
		return settingsObj.default_sound;
	}

	get volume() {
		return settingsObj.volume;
	}

	clientSettings() {
		return {
			utcOffset: this.utcOffset
		}
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

export async function InitSettings() {
	settingsObj = await loadSettings();
	return settingsObj
}

/**
 * @type {SettingsWrapper}
 */
const Settings = new SettingsWrapper();
export default Settings;
