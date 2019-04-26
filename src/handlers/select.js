import {wss} from '../index';

const select = (req, res) => {
    wss.clients.forEach(client => {
      client.send(`SELECT|`);
    });
    res.send('SUCCESS');
};

export default select;