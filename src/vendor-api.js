import express from 'express';
import path from 'path';

const NODE_MODULES_ROOT = path.resolve('node_modules')
const FILE_MAP = {
	'io-3ad0e761.js': "redux-saga/dist/io-3ad0e761.js",
	'io-3f0849c3.js': "redux-saga/dist/io-3f0849c3.js",
	'react.js': "react/umd/react.development.js",
	'react-dom.js': "react-dom/umd/react-dom.development.js",
	'redux.js': "redux/dist/redux.js",
	'react-redux.js': "react-redux/dist/react-redux.js",
	'redux-saga.js': "redux-saga/dist/redux-saga-core.esmodules-browsers.js",
	'redux-saga-effects.js': "redux-saga/dist/redux-saga-effects.esmodules-browsers.js",
	'moment.js': "moment/moment.js",
	'moment-timezone.js': "moment-timezone/moment-timezone.js",
	'htm.mjs': "htm/dist/htm.mjs",
	'htm-react.mjs': "htm/react/index.mjs",
	'socket.io.js': "socket.io/client-dist/socket.io.js",
}

let vendorApi = express.Router();

vendorApi.get('/:lib', function (req, res, next) {
	let ext = '';
	let libFile = req.params.lib;
	if (libFile.endsWith('.map')) {
		ext = '.map';
		libFile = libFile.substring(0, libFile.length - 4);
	}
	if (FILE_MAP.hasOwnProperty(libFile)) {
		let module_path = FILE_MAP[libFile];
		res.sendFile(module_path + ext, { root: NODE_MODULES_ROOT }, (err) => {
			if (err) {
				console.log(err);
			}
			next();
		});
	}
	else {
		res.sendStatus(404);
		next();
	}
});

export default vendorApi;
