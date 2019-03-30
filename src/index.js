import express from 'express';
import * as http from 'http';
import * as WebSocket from 'ws';
import { change } from './handlers/change_screen';

const app = express();
const server = http.createServer(app);

export const wss = new WebSocket.Server({ server });

wss.on('connection', (ws) => {
    ws.on('message', (message) => {
        console.log('received: %s', message);
        ws.send(`Hello, you sent -> ${message}`);
    });
});

app.get('/change/:screenId', change);

server.listen(process.env.PORT || 5000, () => {
    console.log(`Server started on port ${server.address().port} :)`);
});