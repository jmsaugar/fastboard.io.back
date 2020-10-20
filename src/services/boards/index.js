import io from 'socket.io';

import { onJoin, onDisconnect } from './users';
import { onDrawingEvent } from './drawings';

import { boardsMessages } from '../../constants';

/**
 * Initialize socket.io connection.
 */
const init = () => {
  const server = io({ serveClient : false }); // @todo origins

  const serviceScope = Object.freeze({
    server, // Socketio server instance.
    boards  : {}, // boardId : { ...boardData }
    sockets : {}, // socketId : { boardId, socket }
  });

  server.on('connection', (socket) => {
    socket.on(boardsMessages.join, onJoin.bind(serviceScope, socket));
    socket.on('disconnect', onDisconnect.bind(serviceScope, socket.id));
    socket.on('onMouseDown', onDrawingEvent.bind(serviceScope, socket.id, 'onMouseDown'));
    socket.on('onMouseDrag', onDrawingEvent.bind(serviceScope, socket.id, 'onMouseDrag'));
  });

  server.listen(process.env.SOCKETIO_PORT);
};

export default {
  init,
};
