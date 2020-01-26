import express from 'express';
import expressAwait from '@awaitjs/express';
import Events from './EventBus.js';
import Alarm from './Alarm.js';
import { ALARM_UPDATED, ALARM_DELETED } from "../client/js/action-types.js";

let router = expressAwait.decorateRouter(express.Router());

// Get All Alarms
router.getAsync('/', async (req, res, next) => {
	let list = await Alarm.find();
	res.json(list);
	next();
});

// Get Single Alarm
router.getAsync('/:id', async (req, res, next) => {
	let alarm = await Alarm.findOne({ _id: req.params.id })
	if (alarm) {
		res.json(alarm);
	}
	else {
		res.send(404);
	}
	next();
});

// Create Alarm
router.postAsync('/', async (req, res, next) => {
	let alarm = await Alarm.create(req.body).save();
	Events.emit(ALARM_UPDATED, alarm);
	res.json(alarm);
	next();
});

// Update Alarm
router.putAsync('/:id', async (req, res, next) => {
	let alarm = await Alarm.findOneAndUpdate({ _id: req.params.id }, req.body);
	if (alarm) {
		Events.emit(ALARM_UPDATED, alarm);
		res.json(alarm);
	}
	else {
		res.send(404);
	}
	next();
});

// Delete Alarm
router.deleteAsync('/:id', async (req, res, next) => {
	await Alarm.deleteOne({ _id: req.params.id });
	Events.emit(ALARM_DELETED, req.params.id);
	res.status(204);
	next();
});

router.use((err, req, res, next) => {
	let status = 500;
	if (err.name === 'ValidationError') {
		status = 400;
	}
	else {
		console.log(err);
	}
	res.status(status).json({ error: err.message });
	next();
});

export default router;
