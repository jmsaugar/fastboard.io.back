import io from 'socket.io';

import { Log } from '#utils';
import { boardsMessages, drawingsMessages } from '#constants';

import {
  onCreate,
  onJoin,
  onDisconnect,
  onSetUserName,
  onSetBoardName,
  onDrawingMessage,
} from './handlers';

/**
 * Socket.io disconnect event.
 *
 * @see https://socket.io/docs/client-api/#Event-%E2%80%98disconnect%E2%80%99
 */
const socketDisconnect = 'disconnect';

const init = () => {
  Log.info('Service : Realtime : init');

  const server = io({ serveClient : false }); // @todo origins

  const serviceScope = Object.freeze({
    server, // Socketio server instance.
    sockets : {}, // socketId -> { boardId, socket }
  });

  server.on('connection', (socket) => {
    Log.info('Service : Realtime : init : connection', { socketId : socket.id });

    // Boards
    socket.on(socketDisconnect, onDisconnect.bind(serviceScope, socket.id));
    socket.on(boardsMessages.doCreate, onCreate.bind(serviceScope, socket));
    socket.on(boardsMessages.doJoin, onJoin.bind(serviceScope, socket));
    socket.on(boardsMessages.doSetUserName, onSetUserName.bind(serviceScope, socket.id));
    socket.on(boardsMessages.doSetBoardName, onSetBoardName.bind(serviceScope, socket.id));

    // Drawings
    socket.on(
      drawingsMessages.doMouseDown,
      onDrawingMessage.bind(serviceScope, socket.id, drawingsMessages.didMouseDown),
    );
    socket.on(
      drawingsMessages.doMouseDrag,
      onDrawingMessage.bind(serviceScope, socket.id, drawingsMessages.didMouseDrag),
    );
    socket.on(
      drawingsMessages.doSetTool,
      onDrawingMessage.bind(serviceScope, socket.id, drawingsMessages.didSetTool),
    );
  });

  Log.info('Service : Realtime : init : listen');
  server.listen(process.env.SOCKETIO_PORT);
};

export default {
  init,
};
