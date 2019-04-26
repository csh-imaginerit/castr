import {wss} from '../index';

const handle_basic = (id) => {
  wss.clients.forEach(client => {
    console.warn('sending');
    client.send(`CHANGE|${id}`);
  });
};

export const SCREEN_IDS = {
  HOME: handle_basic,
  ABOUT: handle_basic,
  ENTERTAINMENT: handle_basic,
  CSH: handle_basic,
  COMPONENTS: handle_basic
}

export const change = (req, res) => {
  if (SCREEN_IDS[req.params.screenId]) {
    SCREEN_IDS[req.params.screenId](req.params.screenId);
    res.send('SUCCESS')
  } else {
    res.send('ERROR: NO SUCH SCREEN ID')
  }
}

