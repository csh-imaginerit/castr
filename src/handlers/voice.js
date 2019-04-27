import fetch from 'node-fetch';
import {wss} from '../index';
import {next_voice} from './next';
import {select_voice} from './select';
import {back_voice} from './back';
import { change_from_dialog } from './change_screen';1

const handlePlay = (arr) => {
    if (arr.length < 2) {
        fetch('http://musicsystem-imagine-rit-music-player.cs.house/resume');
    } else {
        fetch(`http://musicsystem-imagine-rit-music-player.cs.house/play?q=${arr[3].toLowerCase()}&type=${arr[2].toLowerCase()}`);
    }
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


const handleDisplay = (req, res, arr) => {handleDisplay
    switch (arr[1]) {
        case 'ON':

            break;
        case 'OFF':
            break;

        case 'BACK':
            back_voice();
            break;
        case 'SELECT':
            select_voice();
            break;
        case 'NEXT':
            next_voice();
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
    res.jsonp({
        "payload": {
          "google": {
            "expectUserResponse": true,
            "richResponse": {
              "items": [
                {
                  "simpleResponse": {
                    "textToSpeech": "ok."
                  }
                }
              ]
            }
          }
        }
      });
    res.send(200);
}

export default voice;