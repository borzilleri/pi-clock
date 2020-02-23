import express from 'express';
import camo from 'camo';

import config from './src/config.js';
import { app, server } from './src/server.js';

import SocketManagerInit from './src/SocketManager.js';
import JobManagerInit from './src/JobManager.js';
import { init as SettingsInit } from './src/Settings.js';
import ScreenManager from './src/ScreenManager.js';

import vendorApi from './src/vendor-api.js';
import alarmsRouter from './src/AlarmsApi.js';
import activeRouter from './src/ActiveApi.js';
import soundsRouter from './src/SoundApi.js';

import { fileURLToPath } from 'url';
import { dirname } from 'path';
const __dirname = dirname(fileURLToPath(import.meta.url));

let database;
camo.connect(config.store.db_uri).then(db => {
	// Load the DB.
	console.log("Connected to db.");
	database = db;
}).then(() => {
	// Initialize Modules
	SettingsInit();
	SocketManagerInit();
	JobManagerInit();
	ScreenManager.Init();
}).then(() => {
	// Initialize our Express App.
	app.use(express.json());
	app.use('/client', express.static('client'));
	app.get('/clock', (_, res, next) => {
		res.sendFile('./client/clock.html', { root: __dirname }, next);
	})
	app.get('/', (_, res, next) => {
		res.sendFile('./client/admin.html', { root: __dirname }, next);
	})

	app.use('/alarms', alarmsRouter);
	app.use('/active', activeRouter);
	app.use('/sounds', soundsRouter);
	app.use('/vendor', vendorApi);
	app.use((req, res, next) => {
		console.log(`${req.method} ${req.url} : ${res.statusCode}`);
		next();
	});
}).then(() => {
	// Start our server.
	const port = config.server.port;
	server.listen(port, () => console.log(`pi-cloock listening on port ${port}!`));
});
