import { v4 as uuidv4 } from 'uuid';

import { boardsMessages } from '../../constants';

/**
 * Create a new user and add it to a board.
 * If the board does not exist, it is created.
 *
 * @param {String} boardId Id of the board.
 * @param {String} socket Socket for the user.
 * @param {String} boardName Name of the board (in case of board creation).
 * @param {String} userName Name of the new user.
 */
function addUserToBoard(boardId, socket, boardName, userName) {
  // Create a new user
  const newUser = {
    id       : uuidv4(),
    name     : userName,
    socketId : socket.id,
  };

  // Add user to the board
  if (!this.boards[boardId]) {
    this.boards[boardId] = {
      name         : boardName,
      creationDate : new Date(),
      users        : [newUser],
    };
  } else {
    this.boards[boardId].users.push(newUser);
  }

  // Update socket associations
  this.sockets[socket.id] = { boardId, socket };
}

/**
 * Get all users on a given board.
 *
 * @param {String} boardId Id of the board.
 *
 * @return {Array<Object>} Array of users.
 */
function getBoardUsers(boardId) {
  return (boardId && this.boards[boardId]) ? this.boards[boardId].users : [];
}

/**
 * Handler for user join request.
 *
 * @param {Object} socket Socket instance
 * @param {Object} data { boardId, userName, boardName }
 * @param {Function} ack Callback to acknowledge the join request
 */
function onJoin(socket, { boardId, userName, boardName }, ack) {
  // @todo if no boardId, etc, answer user with rejection
  socket.join(boardId, () => {
    // @todo same with userName?
    if (!boardId) {
      return ack(false);
    }

    // Confirm the user he has joined the room
    ack(true, { boardId, users : getBoardUsers.call(this, boardId) });

    // Add new user to board (also creating board if it does not exist)
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
  if (!this.sockets[socketId]) {
    return ack(false);
  }

  const { boardId } = this.sockets[socketId];
  const board = this.boards[boardId];

  if (!board) {
    return ack(false);
  }

  const user = board.users.find((u) => u.socketId === socketId);

  const { socket } = this.sockets[socketId];

  if (!socket || !user) {
    return ack(false);
  }

  user.name = userName;

  // Tell all other room users that another user has changed his name
  socket.to(boardId).emit(boardsMessages.didSetUserName, { userId : user.id, userName });

  return ack(true);
}

/**
 * Set the name of a board.
 *
 * @param {String} socketId Id of the socket for user setting the board name
 * @param {String} boardName New name for the board
 * @param {Function} ack Callback to acknowledge the request
 */
function onSetBoardName(socketId, boardName, ack) {
  if (!this.sockets[socketId]) {
    return ack(false);
  }

  const { boardId } = this.sockets[socketId];
  const board = this.boards[boardId];

  if (!board) {
    return ack(false);
  }

  const { socket } = this.sockets[socketId];

  if (!socket) {
    return ack(false);
  }

  board.name = boardName;

  // Tell all other room users that the board name has been changed
  socket.to(boardId).emit(boardsMessages.didSetBoardName, { boardId, boardName });

  return ack(true);
}

export {
  onJoin,
  onDisconnect,
  onSetUserName,
  onSetBoardName,
};
