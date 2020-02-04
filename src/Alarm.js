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
	weekDay;
	recurring;

	constructor() {
		super();
		this.name = {
			type: String,
			default: "New Alarm"
		}
		this.sound = String;
		this.recurring = {
			type: Boolean,
			default: false
		}
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
		this.weekDay = {
			type: [Number],
			min: 0,
			max: 6
		};
	}

	get cronSchedule() {
		let weekDayCron = this.weekDay.join(',') || '*';
		return `0 ${this.minute} ${this.hour} * * ${weekDayCron}`;
	}
}
