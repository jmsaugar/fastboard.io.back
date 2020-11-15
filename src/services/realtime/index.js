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
} from './handlers';

const init = () => {
  Log.info('Service : Realtime : init');

  const server = io({ serveClient : false }); // @todo origins

  const serviceScope = Object.freeze({
    server, // Socketio server instance.
    sockets : {}, // socketId -> { boardId, socket }
  });

  server.on(socketIOMessages.connection, (socket) => {
    Log.info('Service : Realtime : init : connection', { socketId : socket.id });

    // Boards
    socket.on(socketIOMessages.disconnetion, onDisconnect.bind(serviceScope, socket.id));
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
      drawingsMessages.doKeyDown,
      onDrawingMessage.bind(serviceScope, socket.id, drawingsMessages.didKeyDown),
    );
    socket.on(
      drawingsMessages.doAddImage,
      onDrawingMessage.bind(serviceScope, socket.id, drawingsMessages.didAddImage),
    );
    socket.on(
      drawingsMessages.doClearBoard,
      onDrawingMessage.bind(serviceScope, socket.id, drawingsMessages.didClearBoard),
    );
  });

  Log.info('Service : Realtime : init : listen');
  server.listen(process.env.SOCKETIO_PORT);
};

export default {
  init,
};
