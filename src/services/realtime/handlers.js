import { Log } from '#utils';
import { boardsErrors, boardsMessages } from '#constants';

import boardsService from '../boards';

/**
 * Handler for board creation request.
 *
 * A new board is created and the user joined to that board.
 *
 * @param {Object} socket Socket instance
 * @param {Object} data { boardName, userName }
 * @param {Function} ack Callback to acknowledge the creation request
 */
function onCreate(socket, { boardName, userName }, ack) {
  Log.info('Services : Realtime : onCreate', {
    socketId : socket.id, boardName, userName,
  });

  // @todo check userName and boardName?
  const boardId = boardsService.createBoard(boardName);

  if (!boardId) {
    Log.error('Services : Realtime : onCreate : board not created');

    ack(false, { errorCode : boardsErrors.generic }); // @todo error payload generator?
    return;
  }

  socket.join(boardId, () => {
    Log.debug('Services : Realtime : onCreate : joined socket', { boardId });

    // Add new user to board
    const user = boardsService.addUser(boardId, userName, socket.id);

    if (!user) {
      Log.error('Services : Realtime : onCreate : user not added to board', { boardId, userName });

      // @todo remove board?

      ack(false, boardsErrors.generic);
      return;
    }

    // Update socket associations
    this.sockets[socket.id] = { boardId, socket };

    // Confirm the user he has created and joined the room
    ack(true, { boardId, boardName });
  });
}

/**
 * Handler for board join request.
 *
 * @param {Object} socket Socket instance
 * @param {Object} data { boardId, userName }
 * @param {Function} ack Callback to acknowledge the join request
 */
function onJoin(socket, { boardId, userName }, ack) {
  Log.info('Services : Realtime : onJoin', {
    socketId : socket.id, boardId, userName,
  });

  const board = boardsService.getBoard(boardId);

  if (!board) {
    Log.error('Services : Realtime : onJoin : board does not exist');

    ack(false, { errorCode : boardsErrors.noBoard }); // @todo error payload generator?
    return;
  }

  socket.join(boardId, () => {
    Log.debug('Services : Realtime : onJoin : joined socket', { boardId });

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
  });
}

/**
 * Handle disconnection of an user.
 *
 * @param {String} socketId Id of the socket for the disconnected user.
 */
function onDisconnect(socketId) {
  Log.info('Services : Realtime : onDisconnect', { socketId });

  if (!this.sockets[socketId]) {
    return;
  }

  const { boardId } = this.sockets[socketId];
  const board = boardsService.getBoard(boardId);

  if (!board) {
    return;
  }

  // Get the disconnecting user
  const user = boardsService.getUsers(boardId).find((u) => u.socketId === socketId);

  // Remove the user from the board
  const usersLeft = boardsService.removeUser(boardId, user.id);

  if (usersLeft) {
    // Tell other users in the board that this user has left
    this.server.to(boardId).emit(boardsMessages.didLeave, { userId : user.id });
  } else {
    // Remove board in case the last user left
    boardsService.removeBoard(boardId);
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
  Log.info('Services : Realtime : onSetUserName', { socketId, userName });

  if (!this.sockets[socketId]) {
    ack(false);
    return;
  }

  const { boardId } = this.sockets[socketId];
  const board = boardsService.getBoard(boardId);

  if (!board) {
    ack(false);
    return;
  }

  // Get the user
  const user = boardsService.getUsers(boardId).find((u) => u.socketId === socketId);

  const { socket } = this.sockets[socketId];

  if (!socket || !user) {
    ack(false);
    return;
  }

  // Update user name
  boardsService.updateUserName(boardId, user.id, userName);

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
  Log.info('Services : Realtime : onSetBoardName', { socketId, boardName });

  if (!this.sockets[socketId]) {
    ack(false);
    return;
  }

  const { boardId } = this.sockets[socketId];
  const board = boardsService.getBoard(boardId);

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
  boardsService.updateBoardName(boardId, boardName);

  // Tell all other room users that the board name has been changed
  socket.to(boardId).emit(boardsMessages.didSetBoardName, { boardId, boardName });

  ack(true);
}

/**
 * Handler for any drawing message.
 *
 * @param {String} socketId Socket id for the user sending the drawing message.
 * @param {String} responseMessage Message type to be sent to the rest of users in the board.
 * @param {Object} data Data to be sent to the rest of users in the board.
 */
function onDrawingMessage(socketId, responseMessage, data) {
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
}

export {
  onCreate,
  onJoin,
  onDisconnect,
  onSetUserName,
  onSetBoardName,
  onDrawingMessage,
};
