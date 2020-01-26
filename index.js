import { promisify } from 'util';
import express from 'express';
import camo from 'camo';
import config from './src/config.js';
import { app, server } from './src/server.js';
import SocketManagerInit from './src/SocketManager.js';
import JobManagerInit from './src/JobManager.js';
import { init as SettingsInit } from './src/Settings.js';
import Events from './src/EventBus.js';
import { DATABASE_LOADED } from './client/js/action-types.js';

import { fileURLToPath } from 'url';
import { dirname } from 'path';
const __dirname = dirname(fileURLToPath(import.meta.url));

SocketManagerInit();
JobManagerInit();
SettingsInit();

let database;
camo.connect(config.store.db_uri)
	.then(db => {
		console.log("Connected to db.");
		database = db;
		Events.emit(DATABASE_LOADED);
	});

SocketManagerInit();
JobManagerInit();

import vendorApi from './src/vendor-api.js';
import alarmsRouter from './src/AlarmsApi.js';
import activeRouter from './src/ActiveApi.js';

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
app.use('/vendor', vendorApi);
app.use((req, res, next) => {
	console.log(`${req.method} ${req.url} : ${res.statusCode}`);
	next();
});

const port = config.server.port;
server.listen(port, () => console.log(`pi-cloock listening on port ${port}!`));
