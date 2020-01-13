import express from 'express';
import path from 'path';
import config from './config.mjs';

const NODE_MODULES_ROOT = path.resolve('node_modules')
let vendorApi = express.Router();

vendorApi.get('/:lib', function (req, res, next) {
	let ext = '';
	let libFile = req.params.lib;
	if( libFile.endsWith('.map') ) {
		ext = '.map';
		libFile = libFile.substring(0, libFile.length-4);
	}
	libFile = libFile.replace(/\./g, '_');
	let module_path = config.vendor[libFile];
	if (module_path) {
		res.sendFile(module_path+ext, { root: NODE_MODULES_ROOT }, (err) => {
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
