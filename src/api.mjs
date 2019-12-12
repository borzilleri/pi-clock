

function nyi(req, res, next) {
	res.send('not yet implemented');
}

function alarm_set(req, res, next) {
	next();
}

function alarm_snooze(req, res, next) {
	res.send(204);
	next();
}

function alarm_off(req, res, next) {
	AlarmManager.Stop();
	res.send(204);
	next();
}

function debug_trigger_alarm(req, res, next) {
	AlarmManager.Start();
	res.send(201);
	next();
}

export const NYI = nyi;
export const Alarm = {
	Snooze: alarm_snooze,
	Off: alarm_off
};
export const Debug = {
	Trigger: debug_trigger_alarm
};
