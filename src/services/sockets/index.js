import io from 'socket.io';

import { Log } from '../../utils';
import {
  onJoin, onDisconnect, onSetUserName, onSetBoardName,
} from './boards';
import { onDrawingEvent } from './drawings';

import { boardsMessages } from '../../constants';

/**
 * Initialize socket.io connection.
 */
const init = () => {
  Log.info('Service : Boards : init');

  const server = io({ serveClient : false }); // @todo origins
  const serviceScope = Object.freeze({
    server, // Socketio server instance.
    boards  : {}, // boardId -> { ...boardData }
    sockets : {}, // socketId -> { boardId, socket }
  });

  server.on('connection', (socket) => {
    Log.info('Service : Boards : init : connection', { socketId : socket.id });

    // Boards
    socket.on(boardsMessages.doJoin, onJoin.bind(serviceScope, socket));
    socket.on('disconnect', onDisconnect.bind(serviceScope, socket.id));
    socket.on(boardsMessages.doSetUserName, onSetUserName.bind(serviceScope, socket.id));
    socket.on(boardsMessages.doSetBoardName, onSetBoardName.bind(serviceScope, socket.id));

    // Drawings
    socket.on('onMouseDown', onDrawingEvent.bind(serviceScope, socket.id, 'onMouseDown'));
    socket.on('onMouseDrag', onDrawingEvent.bind(serviceScope, socket.id, 'onMouseDrag'));
  });

  Log.info('Service : Boards : init : listen');
  server.listen(process.env.SOCKETIO_PORT);
};

export default {
  init,
};
