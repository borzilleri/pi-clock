import camo from 'camo';

export default class Alarm extends camo.Document {
	/**
	 * @type {String}
	 */
	name;
	/**
	 * @type {String}
	 */
	sound;
	/**
	 * @type {Boolean}
	 */
	enabled;
	/**
	 * @type {Number}
	 */
	hour;
	/**
	 * @type {Number}
	 */
	minute;
	/**
	 * @type {Array[Number]}
	 */
	weekDays;

	constructor() {
		super();
		this.name = {
			type: String,
			default: "New Alarm"
		}
		this.sound = String;
		this.enabled = {
			type: Boolean,
			default: true
		}
		this.hour = {
			type: Number,
			default: 12,
			min: 0,
			max: 23
		};
		this.minute = {
			type: Number,
			default: 0,
			min: 0,
			max: 59
		};
		this.weekDays = {
			type: [Number],
			default: [],
			min: 0,
			max: 6
		};
	}
	get recurring() {
		return this.weekDays.length > 0;
	}

	/**
	 * @param {Alarm} other
	 */
	hasDifferentSchedule(other) {
		return other.hour != this.hour ||
			other.minute != this.minute ||
			other.weekDays.sort().join() != this.weekDays.sort().join();
	}
}
