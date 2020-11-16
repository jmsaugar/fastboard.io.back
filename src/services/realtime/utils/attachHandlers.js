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

export default function attachHandlers(server) {
  server.on(socketIOMessages.connection, (socket) => {
    Log.info('Service : Realtime : init : connection', { socketId : socket.id });

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
