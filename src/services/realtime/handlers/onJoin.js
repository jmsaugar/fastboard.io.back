import { Log, BoardError } from '#utils';
import { boardsErrors, boardsMessages } from '#constants';

/**
 * Handler for board join request.
 *
 * @param {Object} socket Socket instance
 * @param {Object} data { boardId, userName }
 * @param {Function} ack Callback to acknowledge the join request
 */
export default function onJoin(socket, { boardId, userName }, ack) {
  Log.info('Service : Realtime : onJoin', {
    socketId : socket.id, boardId, userName,
  });

  const board = this.dependencies.boardsService.getBoard(boardId);

  if (!board) {
    Log.error('Service : Realtime : onJoin : board does not exist');

    ack(false, new BoardError(boardsErrors.noBoard));
    return;
  }

  socket.join(boardId);

  Log.debug('Service : Realtime : onJoin : socket joined board', { boardId });

  // Add new user to board
  const user = this.dependencies.boardsService.addUser(boardId, userName, socket.id);

  if (!user) {
    Log.error('Service : Realtime : onJoin : user not added to board', { boardId, userName });

    ack(false, new BoardError(boardsErrors.generic));
    return;
  }

  // Update socket associations
  this.sockets[socket.id] = { boardId, socket };

  // Confirm the user he has joined the room
  ack(true, {
    boardId,
    boardName : board.name,
    users     : this.dependencies.boardsService.getUsers(boardId).filter(
      ({ socketId }) => socketId !== socket.id,
    ),
  });

  // Tell all other room users that a new user has connected to the room
  socket.to(boardId).emit(boardsMessages.didJoin, { userId : user.id, userName });
}
