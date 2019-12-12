import config from './src/config.mjs';
import restify from 'restify';
import { Alarm, Debug } from './src/api.mjs';
import Alarms from './src/AlarmManager.mjs'

let server = restify.createServer();

server.put('/alarm/current/off', Alarm.Off);
server.post('/alarm/current/snooze', Alarm.Snooze);
server.post('/debug/trigger', Debug.Trigger);

Alarms.loadAlarms();
server.listen(config.server.port, function () {
  console.log('%s listening at %s', server.name, server.url);
});
