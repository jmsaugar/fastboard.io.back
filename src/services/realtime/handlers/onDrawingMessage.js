import { Log } from '#utils';

import boardsService from '../../boards';

/**
 * Handler for any drawing message.
 *
 * @param {String} socketId Socket id for the user sending the drawing message.
 * @param {String} responseMessage Message type to be sent to the rest of users in the board.
 * @param {Object} data Data to be sent to the rest of users in the board.
 */
export default function onDrawingMessage(socketId, responseMessage, data) {
  Log.debug('Service : Realtime : onDrawingMessage', { responseMessage, socketId, data });

  if (!this.sockets[socketId]) {
    Log.warning('Service : Realtime : onDrawingMessage : nonexistent socket association', socketId);
    return;
  }

  const { boardId, socket } = this.sockets[socketId];
  const board = boardsService.getBoard(boardId);

  if (!board) {
    Log.warning('Service : Realtime : onDrawingMessage : nonexistent board', { boardId });
    return;
  }

  if (!socket) {
    Log.warning('Service : Realtime : onDrawingMessage : nonexistent socket', socketId);
    return;
  }

  const userId = boardsService.getUsers(boardId).find((user) => user.socketId === socketId)?.id;

  if (!userId) {
    Log.warning('Service : Realtime : onDrawingMessage : nonexistent user', { socketId });
    return;
  }

  socket.to(boardId).emit(responseMessage, { userId, ...data });

  // @todo ack?
}
