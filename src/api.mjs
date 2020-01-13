import * as AlarmManager from './AlarmManager.mjs';
import express from 'express';

let alarmApi = express.Router();
alarmApi.use(function timeLog(req, res, next) {
	console.log(`${req.method} : ${req.url}`);
	next();
});
alarmApi.get('/current', (req, res, next) => {

})
alarmApi.put('/current/off', (req, res, next) => {
	let active = AlarmManager.getActive();
	if( active ) {
		active.deactivate();
	}
	res.sendStatus(204);
	next();
});
alarmApi.post('/current/snooze', (req, res, next) => {
	let active = AlarmManager.getActive();
	if( active ) {
		active.snooze();
	}
	res.sendStatus(204);
	next();
});

let debugApi = express.Router();
debugApi.post('/debug/trigger', (req, res, next) => {
	res.send(201);
	next();
});


export { alarmApi, debugApi }
