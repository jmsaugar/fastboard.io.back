import { Log } from '#utils';
import { boardsMessages } from '#constants';

import { createBoard, addUserToBoard, getBoardUsers } from './utils';

/**
 * Handler for user join request.
 *
 * If board id is not received, a new
 * board is created for the user to join.
 *
 * @param {Object} socket Socket instance
 * @param {Object} data { boardId, userName, boardName }
 * @param {Function} ack Callback to acknowledge the join request
 */
function onJoin(socket, { boardId : receivedBoardId, userName, boardName }, ack) {
  Log.info('Services : Sockets : onJoin', {
    socketId : socket.id, receivedBoardId, userName, boardName,
  });

  // @todo check userName and boardName?
  const boardId = receivedBoardId || createBoard.call(this, boardName);

  if (!boardId) {
    ack(false);
    return;
  }

  socket.join(boardId, () => {
    Log.debug('Services : Sockets : onJoin : joined socket', { boardId });

    // Confirm the user he has joined the room
    ack(true, { boardId, users : getBoardUsers.call(this, boardId) }); // @todo check the order of this

    // Add new user to board
    addUserToBoard.call(this, boardId, socket, boardName, userName);

    // Tell all other room users that a new user has connected to the room
    socket.to(boardId).emit(boardsMessages.didJoin, { boardId });
  });
}

/**
 * Handle disconnection of an user.
 *
 * @param {String} socketId Id of the socket for the disconnected user.
 */
function onDisconnect(socketId) { // @todo ack?
  Log.info('Services : Sockets : onDisconnect', { socketId });

  if (!this.sockets[socketId]) {
    return;
  }

  const { boardId } = this.sockets[socketId];
  const board = this.boards[boardId];

  if (!board) {
    return;
  }

  let userId;

  // Get user id and remove user from board users list
  board.users = board.users.filter((user) => {
    if (user.socketId === socketId) {
      userId = user.id;
      return false;
    }

    return true;
  });

  if (board.users.length) {
    // Tell other users in the board that this user has left
    this.server.to(boardId).emit(boardsMessages.didLeave, { userId });
  } else {
    // Remove board in case the last user left
    delete this.boards[boardId];
  }

  // Remove socket associations
  delete this.sockets[socketId];
}

/**
 * Set the name of an user.
 *
 * @param {String} socketId Id of the socket for user setting his name
 * @param {String} userName New name for the user
 * @param {Function} ack Callback to acknowledge the request
 */
function onSetUserName(socketId, userName, ack) {
  Log.info('Services : Sockets : onSetUserName', { socketId, userName });

  if (!this.sockets[socketId]) {
    ack(false);
    return;
  }

  const { boardId } = this.sockets[socketId];
  const board = this.boards[boardId];

  if (!board) {
    ack(false);
    return;
  }

  const user = board.users.find((u) => u.socketId === socketId);

  const { socket } = this.sockets[socketId];

  if (!socket || !user) {
    ack(false);
    return;
  }

  user.name = userName;

  // Tell all other room users that another user has changed his name
  socket.to(boardId).emit(boardsMessages.didSetUserName, { userId : user.id, userName });

  ack(true);
}

/**
 * Set the name of a board.
 *
 * @param {String} socketId Id of the socket for user setting the board name
 * @param {String} boardName New name for the board
 * @param {Function} ack Callback to acknowledge the request
 */
function onSetBoardName(socketId, boardName, ack) {
  Log.info('Services : Sockets : onSetBoardName', { socketId, boardName });

  if (!this.sockets[socketId]) {
    ack(false);
    return;
  }

  const { boardId } = this.sockets[socketId];
  const board = this.boards[boardId];

  if (!board) {
    ack(false);
    return;
  }

  const { socket } = this.sockets[socketId];

  if (!socket) {
    ack(false);
    return;
  }

  board.name = boardName;

  // Tell all other room users that the board name has been changed
  socket.to(boardId).emit(boardsMessages.didSetBoardName, { boardId, boardName });

  ack(true);
}

export {
  onJoin,
  onDisconnect,
  onSetUserName,
  onSetBoardName,
};
