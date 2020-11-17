import { Log } from '#utils';
import { boardsMessages } from '#constants';

/**
 * Set the name of an user.
 *
 * @param {String} socketId Id of the socket for user setting his name
 * @param {String} userName New name for the user
 * @param {Function} ack Callback to acknowledge the request
 */
export default function onSetUserName(socketId, userName, ack) {
  Log.info('Services : Realtime : onSetUserName', { socketId, userName });

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

  // Get the user
  const user = this.dependencies.boardsService.getUsers(boardId).find(
    (u) => u.socketId === socketId,
  );

  const { socket } = this.sockets[socketId];

  if (!socket || !user) {
    ack(false);
    return;
  }

  // Update user name
  this.dependencies.boardsService.updateUserName(boardId, user.id, userName);

  // Tell all other room users that another user has changed his name
  socket.to(boardId).emit(boardsMessages.didSetUserName, { userId : user.id, userName });

  ack(true);
}
