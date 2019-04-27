import {wss} from '../index';

export const select_voice = () => {
  wss.clients.forEach(client => {
    client.send(`SELECT|`);
  });
};

const select = (req, res) => {
    wss.clients.forEach(client => {
      client.send(`SELECT|`);
    });
    res.send('SUCCESS');
};

export default select;