import express from 'express';
import camo from 'camo';
import config from './src/config.js';
import { app, server } from './src/server.js';
import SocketManagerInit from './src/SocketManager.js';
import JobManagerInit from './src/JobManager.js';
import Events from './src/EventBus.js';
import { DATABASE_LOADED } from './shared/action-types.js';

let database;
camo.connect(config.store.alarm_uri)
	.then(db => {
		console.log("Connected to db.");
		database = db;
		Events.emit(DATABASE_LOADED);
	});

SocketManagerInit();
JobManagerInit();

import vendorApi from './src/vendor-api.js';
import alarmsRouter from './src/AlarmsApi.js';

app.use(express.json());
app.use('/shared', express.static('shared'));
app.use('/clock', express.static('clock'));
app.use('/alarms', alarmsRouter);
app.use('/vendor', vendorApi);
app.use((req, res, next) => {
	console.log(`${req.method} ${req.url} : ${res.statusCode}`);
	next();
});

const port = config.server.port;
server.listen(port, () => console.log(`pi-cloock listening on port ${port}!`));
