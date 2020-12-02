import io from 'socket.io';

import { Log } from '#utils';
import { boardsMessages, drawingsMessages, socketIOMessages } from '#constants';

import {
  onCreate,
  onJoin,
  onDisconnect,
  onSetUserName,
  onSetBoardName,
  onDrawingMessage,
} from '../handlers';

/**
 * Attach handlers to socket.io server based on message types.
 *
 * @param {Object} server Socket.io server to be attached handlers to.
 */
function attachHandlers(server) {
  Log.info('Service : Realtime : attachHandlers');

  server.on(socketIOMessages.connection, (socket) => {
    Log.info('Service : Realtime : attachHandlers : socket connected', { socketId : socket.id });

    // Boards
    socket.on(socketIOMessages.disconnection, onDisconnect.bind(this, socket.id));
    socket.on(boardsMessages.doCreate, onCreate.bind(this, socket));
    socket.on(boardsMessages.doJoin, onJoin.bind(this, socket));
    socket.on(boardsMessages.doSetUserName, onSetUserName.bind(this, socket.id));
    socket.on(boardsMessages.doSetBoardName, onSetBoardName.bind(this, socket.id));

    // Drawings
    socket.on(
      drawingsMessages.doMouseDown,
      onDrawingMessage.bind(this, socket.id, drawingsMessages.didMouseDown),
    );
    socket.on(
      drawingsMessages.doMouseDrag,
      onDrawingMessage.bind(this, socket.id, drawingsMessages.didMouseDrag),
    );
    socket.on(
      drawingsMessages.doMouseUp,
      onDrawingMessage.bind(this, socket.id, drawingsMessages.didMouseUp),
    );
    socket.on(
      drawingsMessages.doKeyDown,
      onDrawingMessage.bind(this, socket.id, drawingsMessages.didKeyDown),
    );
    socket.on(
      drawingsMessages.doAddImage,
      onDrawingMessage.bind(this, socket.id, drawingsMessages.didAddImage),
    );
    socket.on(
      drawingsMessages.doClearBoard,
      onDrawingMessage.bind(this, socket.id, drawingsMessages.didClearBoard),
    );
  });
}

/**
 * Start the realtime service.
 */
export default function start() {
  Log.info('Service : Realtime : start');

  this.server = io(
    process.env.SOCKETIO_PORT, {
      serveClient : false,
      cors        : {
        origin      : process.env.FRONT_HOST,
        credentials : true,
      },
    },
  );

  attachHandlers.call(this, this.server);

  Log.info('Service : Realtime : start : listening : port', process.env.SOCKETIO_PORT);
}
