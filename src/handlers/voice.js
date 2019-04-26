import {wss} from '../index';

const voice = (req, res) => {
    console.log(req.body);
    wss.clients.forEach(client => {
        console.warn('sending voice');
        client.send(`VOICE|${JSON.stringify(req.body)}`);
      });
    res.send(req.body);
}

export default voice;