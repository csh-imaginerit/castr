import {wss} from '../index';

export const next_voice = () => {
  wss.clients.forEach(client => {
    client.send(`NEXT|`);
  });
};


const next = (req, res) => {
    wss.clients.forEach(client => {
      client.send(`NEXT|`);
    });
    res.send('SUCCESS');
};

export default next;