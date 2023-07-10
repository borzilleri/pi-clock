/* Simple test harness for player modules.
 * Run this like:
 * node sound_test.js <moduleName> <soundFile>
 */

const moduleName = process.argv[2]
const soundFile = process.argv[3]

import(`./src/modules/${moduleName}.js`).then(module => {
	module.default.playAudioFile(soundFile);
});

