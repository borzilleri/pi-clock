//@ts-check
import { exec, spawn } from 'child_process';
import Module from './Module.js';

const AUDIO_PLAYER_EXE = '/usr/bin/afplay';

let currentSound;
let audio_proc

function audioCloseHandler(err) {
	if (err) {
		console.error(`Error in audio player ${AUDIO_PLAYER_EXE}:`, err)
	}
	else if (!audio_proc.killed) {
		console.log("Audio player stopped, but not killed, restarting with sound:", currentSound);
		playAudioFile(currentSound);
	}
}

function playAudioFile(fileName) {
	let args = [fileName];
	console.log("Starting Player: ", AUDIO_PLAYER_EXE, args)
	audio_proc = spawn(AUDIO_PLAYER_EXE, args, { stdio: 'inherit' })
	if (!audio_proc) {
		console.error("Unable to spawn process with player: ", AUDIO_PLAYER_EXE);
	}
	audio_proc.on('close', audioCloseHandler);
}

function sendNotification(title, message) {
	let cmd = `osascript -e 'display notification "${message}" with title "${title}"'`;
	let p = exec(cmd, (err) => {
		if (err) {
			console.error("Error sending notification: ", err);
		}
	});
	if (!p) {
		console.error("Unable to spawn notification process.");
	}
}

class MacOSModule extends Module {
	playAudioFile(fileName) {
		if (!fileName) {
			this.playDefaultAudio();
		}
		else {
			if (currentSound) {
				this.stopAudio();
			}
			currentSound = fileName;
			playAudioFile(fileName);
		}
	}

	playDefaultAudio() {
		sendNotification("pi-clock", "Unknown Sound Playing.");
	}

	stopAudio() {
		if (audio_proc) {
			console.log("Killing audio process:", audio_proc.pid);
			audio_proc.kill();
			currentSound = null;
		}
	}

	activateScreen() {
		sendNotification("pi-clock", "Screen Activated.");
	}
}

export default new MacOSModule();
