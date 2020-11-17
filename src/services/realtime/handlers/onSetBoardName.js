import { Log } from '#utils';
import { boardsMessages } from '#constants';

/**
 * Set the name of a board.
 *
 * @param {String} socketId Id of the socket for user setting the board name
 * @param {String} boardName New name for the board
 * @param {Function} ack Callback to acknowledge the request
 */
export default function onSetBoardName(socketId, boardName, ack) {
  Log.info('Services : Realtime : onSetBoardName', { socketId, boardName });

  if (!this.sockets[socketId]) {
    ack(false);
    return;
  }

  const { boardId } = this.sockets[socketId];
  const board = this.dependencies.boardsService.getBoard(boardId);

  if (!board) {
    ack(false);
    return;
  }

  const { socket } = this.sockets[socketId];

  if (!socket) {
    ack(false);
    return;
  }

  // Update board name
  this.dependencies.boardsService.updateBoardName(boardId, boardName);

  // Tell all other room users that the board name has been changed
  socket.to(boardId).emit(boardsMessages.didSetBoardName, { boardId, boardName });

  ack(true);
}
