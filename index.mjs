import http from 'http';
import config from './src/config.mjs';
import express from 'express';
import socketIO from 'socket.io';

import vendorApi from './src/vendor-api.mjs';

const port = config.server.port;
let app = express();
let server = http.createServer(app);
let io = socketIO(server);

import * as api from './src/api.mjs';

app.use('/', express.static('client'));
app.use('/alarms', api.alarmApi);
app.use('/debug', api.debugApi);
app.use('/vendor', vendorApi);
app.use((req, res, next) => {
	console.log(`${req.method} ${req.url} : ${res.statusCode}`);
	next();
});

io.on('connection', (socket) => {
	console.log("connected");
	socket.send({type:'DEBUG_RESPONSE', payload:"connection test"});
	socket.on('message', (msg) => {
		console.log(msg);
	})
});
io.on('message', (msg) => {
	console.log(msg);
});
io.on('DEBUG_REQUEST', (msg) => {
	if( msg.type == 'DEBUG_REQUEST') {
		io.emit('DEBUG_RESPONSE', {type:'DEBUG_RESPONSE', payload:"debug response test"});
	}
	else {
		console.log(msg);
	}
})

server.listen(port, () => console.log(`Example app listening on port ${port}!`));
