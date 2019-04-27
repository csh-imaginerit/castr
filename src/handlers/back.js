import {wss} from '../index';

export const back_voice = () => {
  wss.clients.forEach(client => {
    client.send(`BACK|`);
  });
};

const back = (req, res) => {
    wss.clients.forEach(client => {
      client.send(`BACK|`);
    });
    res.send('SUCCESS');
};

export default back;