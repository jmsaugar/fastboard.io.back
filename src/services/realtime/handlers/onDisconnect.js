import { Log } from '#utils';
import { boardsMessages } from '#constants';

/**
 * Handle disconnection of an user.
 *
 * @param {String} socketId Id of the socket for the disconnected user.
 */
export default function onDisconnect(socketId) {
  Log.info('Services : Realtime : onDisconnect', { socketId });

  if (!this.sockets[socketId]) {
    return;
  }

  const { boardId } = this.sockets[socketId];
  const board = this.dependencies.boardsService.getBoard(boardId);

  if (!board) {
    return;
  }

  // Get the disconnecting user
  const user = this.dependencies.boardsService.getUsers(boardId).find(
    (u) => u.socketId === socketId,
  );

  // Remove the user from the board
  const usersLeft = this.dependencies.boardsService.removeUser(boardId, user.id);

  if (usersLeft) {
    // Tell other users in the board that this user has left
    this.server.to(boardId).emit(boardsMessages.didLeave, { userId : user.id });
  } else {
    // Remove board in case the last user left
    this.dependencies.boardsService.removeBoard(boardId);
  }

  // Remove socket associations
  delete this.sockets[socketId];
}
