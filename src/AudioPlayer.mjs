import { promises as fsp, Stats } from 'fs'
import PlaySound from 'play-sound';
import config from './config.mjs';
let player = PlaySound({})

let ACTIVE = null;

function soundPath(name) {
	return `${config.store.sounds}/${name}.mp3`
}

function error_handler(err) {
	if (err) {
		console.error("Error playing alarm: " + err);
	}
}


function Play(soundName) {
	let soundFile = soundPath(soundName);
	fsp.stat(soundFile)
		.then(stat => {
			if (!stat.isFile()) {
				throw Error(`${soundName} is not a file.`)
			}
		})
		.then(() => {
			if (ACTIVE) {
				console.log("Sound already active, stopping.");
				ACTIVE.kill();
			}
			console.log(`playing ${soundFile}`)
			ACTIVE = player.play(soundFile, error_handler);
		})
}

function Stop() {
	if (ACTIVE) {
		console.log("Stopping curent playback.");
		ACTIVE.kill();
	}
	else {
		console.log("No current alarm found.");
	}
}

export default {
	Play,
	Stop
}
