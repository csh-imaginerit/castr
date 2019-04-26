import {wss} from '../index';

const next = (req, res) => {
    wss.clients.forEach(client => {
      client.send(`NEXT|`);
    });
    res.send('SUCCESS');
};

export default next;