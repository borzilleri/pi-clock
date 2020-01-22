import express from 'express';
import expressAwait from '@awaitjs/express';
import Events from './EventBus.js';
import { ALARM_SNOOZE, ALARM_STOP } from "../shared/action-types.js";

let router = expressAwait.decorateRouter(express.Router());

// Snooze Active Alarm
router.postAsync('/snooze', async (req, res) => {
	Events.emit(ALARM_SNOOZE);
	res.status(204);
});

// Stop Active Alarm
router.postAsync('/stop', async (req, res) => {
	Events.emit(ALARM_STOP);
	res.status(204);
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
