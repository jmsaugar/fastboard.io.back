import { Log } from '#utils';
import { boardsErrors } from '#constants';

/**
 * Handler for board creation request.
 *
 * A new board is created and the user joined to that board.
 *
 * @param {Object} socket Socket instance
 * @param {Object} data { boardName, userName }
 * @param {Function} ack Callback to acknowledge the creation request
 */
export default function onCreate(socket, { boardName, userName }, ack) {
  Log.info('Service : Realtime : onCreate', {
    socketId : socket.id, boardName, userName,
  });

  // @todo check userName and boardName?
  const boardId = this.dependencies.boardsService.createBoard(boardName);

  if (!boardId) {
    Log.error('Service : Realtime : onCreate : board not created');

    ack(false, { errorCode : boardsErrors.generic }); // @todo error payload generator?
    return;
  }

  socket.join(boardId);

  Log.debug('Service : Realtime : onCreate : socket joined board', { boardId });

  // Add new user to board
  const user = this.dependencies.boardsService.addUser(boardId, userName, socket.id);

  if (!user) {
    Log.error('Service : Realtime : onCreate : user not added to board', { boardId, userName });

    // @todo remove board?

    ack(false, boardsErrors.generic);
    return;
  }

  // Update socket associations
  this.sockets[socket.id] = { boardId, socket };

  // Confirm the user he has created and joined the room
  ack(true, { boardId, boardName });
}
