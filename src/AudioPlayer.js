//@ts-check
import fs from 'fs';
import path from 'path';
import config from './config.js';
import Settings from './Settings.js';
let fsp = fs.promises;

import Module from './modules/Module.js';
/**
 * @type {Module}
 */
let audioModule;


const SOUNDS_DIR = path.resolve(config.store.sounds_dir);
const SOUND_FILES = loadSoundFiles();

function loadSoundFiles() {
	// @ts-ignore
	return Object.fromEntries(fs.readdirSync(SOUNDS_DIR, { withFileTypes: true })
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
}

/**
 * Retrieve the file path for the given sound name from our known sounds map.
 * 
 * @param {String} soundName 
 */
async function getSoundFile(soundName) {
	console.log("Retrieving sound: ", soundName)
	if (soundName && SOUND_FILES.hasOwnProperty(soundName)) {
		let filePath = SOUND_FILES[soundName];
		console.log("Located sound file path: ", filePath)
		return fsp.access(filePath, fs.constants.R_OK)
			.then(() => {
				console.log("File path exists: ", filePath);
				return filePath;
			})
			.catch(() => {
				console.log("File path not accessible: ", filePath);
				return null
			});
	}
	console.log("No sound known by name: ", soundName);
	return null;
}

/**
 * Resolve the sound with the given name.
 * 
 * @param {String} soundName 
 */
async function resolveSound(soundName) {
	// Check to see if we know about the requested file
	// and that it exists
	let filePath = await getSoundFile(soundName);
	if (filePath) {
		console.log(`Found ${soundName} : ${filePath}`);
		return filePath;
	}
	console.log("Loading default sound.");
	// If not, check the default sound, ensure it exists.
	filePath = await getSoundFile(Settings.default_sound);
	return filePath;
}

export function ListSounds() {
	return Object.keys(SOUND_FILES);
}

export function GetDefaultSound() {
	return config.audio.default_sound;
}

export async function PlayAudio(soundName) {
	let filePath = await resolveSound(soundName);
	audioModule.playAudioFile(filePath);
}

export function StopAudio() {
	console.log("StopAudio called.");
	audioModule.stopAudio();
}

export function InitAudioPlayer() {
	let modulePath = `./modules/${config.alarm.module}.js`;
	import(modulePath).then(loadedModule => audioModule = loadedModule.default);
}
