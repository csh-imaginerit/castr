import express from 'express';
import * as http from 'http';
import * as WebSocket from 'ws';
import { change, next, back, select } from './handlers'

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
app.get('/next', next);
app.get('/select', select);
app.get('/back', back);


server.listen(process.env.PORT || 8080, () => {
    console.log(`Server started on port ${server.address().port} :)`);
});