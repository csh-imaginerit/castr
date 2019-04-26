import {wss} from '../index';

const back = (req, res) => {
    wss.clients.forEach(client => {
      client.send(`BACK|`);
    });
    res.send('SUCCESS');
};

export default back;