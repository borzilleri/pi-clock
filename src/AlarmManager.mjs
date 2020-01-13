import Store from './Store.mjs';
import config from './config.mjs';
import cron from 'cron';
import AudioPlayer from './AudioPlayer.mjs';
import moment from 'moment';
import { md5 } from './util.mjs';

const SNOOZE_DURATION = moment.duration(config.alarm.snooze_time, 'Seconds');
let ALARMS = [];
let ACTIVE = null;

class Alarm {
	[Symbol.toStringTag] = "Alarm";

	name = "TestName";
	sound;
	schedule;
	enabled = false;

	job;

	snooze_until = null;
	snooze_timeout = null;

	get id() {
		return md5(`${this.name}-${this.schedule}`);
	}

	get snoozeTimeLeft() {
		if (!this.snooze_until) {
			return moment.duration(moment().diff(this.snooze_until));
		}
		returm - 1;
	}


	initJob() {
		if (this.enabled) {
			this.job = cron.job(
				this.schedule,
				this.onTick,
				this.onComplete,
				true,
				null,
				this
			);
		}
	}

	activate() {
		if (ACTIVE && ACTIVE.id !== this.id) {
			ACTIVE.deactivate();
		}
		ACTIVE = this;
		this.playSound();
	}

	deactivate() {
		this.stopSound();
	}

	snooze() {
		if (!ACTIVE || ACTIVE.id !== this.id) {
			console.log(`${this.name}: not active, ignoring snooze.`);
		}
		else if (this.snooze_timeout) {
			console.log(`${this.name}: currently snoozing, ignoring snooze.`);
		}
		else {
			this.snooze_until = moment().add(SNOOZE_DURATION);
			console.log(`${this.name}: snoozing until ${this.snooze_until}`)
			this.stopSound();
			setTimeout(() => this.playSound(), SNOOZE_DURATION);
		}
	}

	playSound() {
		console.log(this.sound);
		AudioPlayer.Play(this.sound);
	}

	stopSound() {
		AudioPlayer.Stop();
	}

	onTick(onComplete) {
		console.log(`Alarm "${this.name}" is going off!`);
		this.activate();
	}

	onComplete() {
		console.log(`Alarm ${this.name} disabled`);
		//Do i set enabled=false here?
	}

	toJSON() {
		return {
			name: this.name,
			sound: this.sound,
			schedule: this.schedule,
			enabled: this.enabled
		}
	}

	toString() {
		return `Alarm[id=${this.id}, name=${this.name}, schedule=${this.schedule}, enabled=${this.enabled}]`
	}
}


async function loadAlarms() {
	return Store.readJson(config.store.alarms)
		.then(data => {
			data.forEach(alarm => { alarm.initJob(); });
			ALARMS = data;
			console.log(`loaded ${ALARMS.length} alarms.`);
			return true;
		});
}

async function saveAlarms() {
	return Store.writeData(config.store.alarms, ALARMS);
}

function getActive() {
	return ACTIVE;
}

loadAlarms();
Store.registerClass(Alarm);

export { getActive }
