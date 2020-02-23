import fs from 'fs';
import { spawn } from 'child_process';
import findExec from 'find-exec';
import config from './config.js';
import path from 'path';

const SOUNDS_DIR = path.resolve(config.store.sounds_dir);
const PLAYER_EXE = findExec(config.audio.player);
const PLAYER_ARGS = config.audio.player_args;

if (!PLAYER_EXE) {
	throw new Error(`Unable to find player executable: ${config.audio.player}`)
}
const SOUND_FILES = Object.fromEntries(fs.readdirSync(SOUNDS_DIR, { withFileTypes: true })
	.filter(f => f.isFile())
	.filter(f => {
		let ext = path.extname(f.name);
		return ext && ext !== f.name &&
			config.audio.extensions.includes(ext)
	})
	.map(fd => {
		let f = path.parse(fd.name);
		return [f.name, path.resolve(SOUNDS_DIR, fd.name)]
	}));

let currentSound;
let process;

function closeHandler(err) {
	if (err) {
		console.log(`Error in audio player ${PLAYER_EXE}:`, err)
	}
	else if (!process.killed) {
		PlayAudio(currentSound);
	}
}

export function ListSounds() {
	return Object.keys(SOUND_FILES);
}

export function GetDefaultSound() {
	return 'Droplets';
}

export function PlayAudio(soundName) {
	// Ensure we were passed a sound file.
	if (!soundName) {
		throw new Error("No audio file specified");
	}
	// Ensure it's one we know about.
	if (!SOUND_FILES.hasOwnProperty(soundName)) {
		throw new Error(`Unknown sound file specified: ${soundName}`)
	}
	let sound_file = SOUND_FILES[soundName];

	// If we're already playing a sound, stop it.
	if (process) {
		process.kill();
	}

	currentSound = soundName;
	let options = { stdio: 'ignore' }
	let args = PLAYER_ARGS.concat([sound_file]);
	process = spawn(PLAYER_EXE, args, options);
	if (!process) {
		throw new Error(`Unable to spawn process with player: ${PLAYER_EXE}`)
	}
	process.on('close', closeHandler);
}

export function StopAudio() {
	if (process) {
		process.kill();
	}
}
