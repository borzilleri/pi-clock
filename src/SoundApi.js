import express from 'express';
import expressAwait from '@awaitjs/express';
import { ListSounds, GetDefaultSound } from './AudioPlayer.js';

let router = expressAwait.decorateRouter(express.Router());

// List All Available Sounds
router.getAsync('/', async (req, res, next) => {
	let list = ListSounds()
	res.json(list);
	next();
});

router.getAsync('/default', async (req, res, next) => {
	res.json({ defaultSound: GetDefaultSound() });
	next();
})

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
