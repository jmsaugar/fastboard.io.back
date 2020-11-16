import { Log } from '#utils';
import { boardsErrors, boardsMessages } from '#constants';

import boardsService from '../../boards';

/**
 * Handler for board join request.
 *
 * @param {Object} socket Socket instance
 * @param {Object} data { boardId, userName }
 * @param {Function} ack Callback to acknowledge the join request
 */
export default function onJoin(socket, { boardId, userName }, ack) {
  Log.info('Services : Realtime : onJoin', {
    socketId : socket.id, boardId, userName,
  });

  const board = boardsService.getBoard(boardId);

  if (!board) {
    Log.error('Services : Realtime : onJoin : board does not exist');

    ack(false, { errorCode : boardsErrors.noBoard }); // @todo error payload generator?
    return;
  }

  socket.join(boardId);

  Log.debug('Services : Realtime : onJoin : socket joined board', { boardId });

  // Add new user to board
  const user = boardsService.addUser(boardId, userName, socket.id);

  if (!user) {
    Log.error('Services : Realtime : onJoin : user not added to board', { boardId, userName });

    ack(false, boardsErrors.generic);
    return;
  }

  // Update socket associations
  this.sockets[socket.id] = { boardId, socket };

  // Confirm the user he has joined the room
  ack(true, {
    boardId,
    boardName : board.name,
    users     : boardsService.getUsers(boardId).filter(({ socketId }) => socketId !== socket.id),
  });

  // Tell all other room users that a new user has connected to the room
  socket.to(boardId).emit(boardsMessages.didJoin, { userId : user.id, userName });
}
