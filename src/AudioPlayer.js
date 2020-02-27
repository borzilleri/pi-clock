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
let player_proc;

function closeHandler(err) {
	if (err) {
		console.log(`Error in audio player ${PLAYER_EXE}:`, err)
	}
	else if (!player_proc.killed) {
		PlayAudio(currentSound);
	}
}

export function ListSounds() {
	return Object.keys(SOUND_FILES);
}

export function GetDefaultSound() {
	return config.audio.default_sound;
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
	if (player_proc) {
		player_proc.kill();
	}

	currentSound = soundName;
	let options = { stdio: 'inherit' }
	let args = PLAYER_ARGS.concat([sound_file]);
	console.log("Starting Player:", PLAYER_ARGS, args)
	player_proc = spawn(PLAYER_EXE, args, options);
	if (!player_proc) {
		throw new Error(`Unable to spawn process with player: ${PLAYER_EXE}`)
	}
	player_proc.on('close', closeHandler);
}

export function StopAudio() {
	console.log("StopAudio called.");
	if (player_proc) {
		console.log("Killing audio process:", player_proc);
		player_proc.kill();
	}
}
