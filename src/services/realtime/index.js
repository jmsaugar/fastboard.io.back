import io from 'socket.io';

import { Log } from '#utils';

import { attachHandlers } from './utils';

const init = () => {
  Log.info('Service : Realtime : init');

  const server = io(
    process.env.SOCKETIO_PORT, {
      serveClient : false,
      cors        : {
        origin      : process.env.FRONT_HOST,
        credentials : true,
      },
    },
  );

  const serviceScope = Object.freeze({
    server, // Socketio server instance.
    sockets : {}, // socketId -> { boardId, socket }
  });

  attachHandlers.call(serviceScope, server);

  Log.info('Service : Realtime : init : listening');
};

export default {
  init,
};
