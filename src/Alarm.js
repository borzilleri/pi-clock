import camo from 'camo';

export default class Alarm extends camo.Document {
	constructor() {
		super();
		this.name = {
			type: String,
			default: "TestAlarm"
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
			default: 0,
			min: 0,
			max: 6
		};
	}

	get cronSchedule() {
		return `0 ${this.minute} ${this.hour} * * ${this.weekDay}`;
	}
}
