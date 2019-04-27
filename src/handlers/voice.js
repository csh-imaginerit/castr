import fetch from 'node-fetch';
import {wss} from '../index';
import { back, next, select } from '.';
import { change_from_dialog } from './change_screen';

const handlePlay = (arr) => {
    fetch('http://musicsystem-imagine-rit-music-player.cs.house/resume');
}

const handleSpotify = (arr) => {
    switch (arr[1]) {
        case 'PAUSE':
            fetch('http://musicsystem-imagine-rit-music-player.cs.house/pause');
            break;
        case 'VOLUME':
            fetch(`http://musicsystem-imagine-rit-music-player.cs.house/volume?volume=${arr[2].toLowerCase()}`);
            break;
        case 'SKIP_BACKWARD':
            fetch('http://musicsystem-imagine-rit-music-player.cs.house/change?forward=false');
            break;
        case 'SKIP_FORWARD':
            fetch('http://musicsystem-imagine-rit-music-player.cs.house/change?forward=true')
            break;
        case 'PLAY':
            handlePlay(arr);
            break;
    }
}


const handleDisplay = (req, res, arr) => {
    switch (arr[1]) {
        case 'ON':

            break;
        case 'OFF':
            break;

        case 'BACK':
            back(req, res);
            break;
        case 'SELECT':
            select(req, res);
            break;
        case 'NEXT':
            next(req, res);
            break;

        case 'SHOW':
            change_from_dialog(req, res, arr[2]);
            break;
    }
}


const voice = (req, res) => {
    console.log(req.body);
    const arr = req.body.queryResult.fulfillmentText.split(':');

    switch (arr[0]) {
        case 'SPOTIFY':
            handleSpotify(arr);
            break;
        case 'DISPLAY':
            handleDisplay(req, res, arr);
            break;
        default:
            break;
    }

    wss.clients.forEach(client => {
        console.warn('sending voice');
        client.send(`VOICE|${JSON.stringify(req.body.queryResult.fulfillmentText)}`);
      });
    res.send(200);
}

export default voice;