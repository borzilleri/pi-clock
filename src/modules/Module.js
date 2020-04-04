export default class Module {
	/**
	 * Play the given audio file.
	 * @param {String} filePath 
	 */
	playAudioFile(filePath) {
		this._WARNING('playAudioFile(filePath)');
	}

	/**
	 * Play a sound when there is no given audio file.
	 */
	playDefaultAudio() {
		this._WARNING('playDefaultAudio()');
	}

	/**
	 * Stop the currently playing audio file, if any.
	 */
	stopAudio() {
		this._WARNING('stopAudio()');
	}

	/**
	 * Activate the clock screen.
	 */
	activateScreen() {
		this._WARNING('activateScreen()');
	}

	_WARNING(fName = 'unknown method') {
		console.warn('WARNING! Function "' + fName + '" is not overridden in ' + this.constructor.name);
	}
}
