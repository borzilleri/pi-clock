import http from 'http';
import express from 'express';
import socketIO from 'socket.io';

export const app = express();
export const server = http.createServer(app);
export const io = socketIO(server);
