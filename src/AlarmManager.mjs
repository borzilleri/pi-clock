import Store from './Store.mjs';
import config from './config.mjs';
import cron from 'cron';
import AudioPlayer from './AudioPlayer.mjs';

let ALARMS = [];
let ACTIVE = null;

class Alarm {
	name = "TestName";
	sound;
	schedule;
	enabled = false;

	job;

	initJob() {
		this.job = cron.job(
			this.schedule,
			this.onTick,
			this.onComplete,
			true,
			null,
			this
		);
	}

	activate() {
		ACTIVE = this;
		AudioPlayer.Play(this.sound);
	}

	snooze() {
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
}


async function loadAlarms() {
	return Store.readJson(config.store.alarms)
		.then(data => {
			data.forEach(alarm => { alarm.initJob(); });
			ALARMS = data;
			return true;
		});
}

async function saveAlarms() {
	return Store.writeData(config.store.alarms, ALARMS);
}

Store.registerClass(Alarm);

export default {
	loadAlarms: loadAlarms
}
