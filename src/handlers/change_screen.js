import {wss} from '../index';

const handle_basic = (id) => {
  wss.clients.forEach(client => {
    client.send(`CHANGE|${id}`);
  });
};

export const SCREEN_IDS = {
  HOME: handle_basic,
  MUSIC: handle_basic,
  MANUAL: handle_basic,
  INFORMATION: handle_basic
}

export const change = (req, res) => {
  if (SCREEN_IDS[req.params.screenId]) {
    SCREEN_IDS[req.params.screenId](req.params.screenId);
    res.send('SUCCESS')
  } else {
    res.send('ERROR: NO SUCH SCREEN ID')
  }
}

