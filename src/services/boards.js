import io from 'socket.io';
import { v4 as uuidv4 } from 'uuid';

import { boardsMessages } from '../constants';

let server; // Socketio server instance
const boards = {}; // Object that contains data for boards (including users)
const socket2board = {}; // Required to keep link between socket.id and board
const id2socket = {}; // Required to keep link between socket.id and socket object

/**
 * Create a new user and add it to a board.
 * If the board does not exist, it is created.
 *
 * @param {String} boardId Id of the board.
 * @param {String} socket Socket for the user.
 * @param {String} boardName Name of the board (in case of board creation).
 * @param {String} userName Name of the new user.
 */
const addUserToBoard = (boardId, socket, boardName, userName) => {
  const newUser = {
    id       : uuidv4(),
    name     : userName,
    socketId : socket.id,
  };

  if (!boards[boardId]) {
    boards[boardId] = {
      name         : boardName,
      creationDate : new Date(),
      users        : [newUser],
    };
  } else {
    boards[boardId].users.push(newUser);
  }

  socket2board[socket.id] = boardId;
  id2socket[socket.id] = socket;
};

/**
 * Get all users on a given board.
 *
 * @param {String} boardId Id of the board.
 *
 * @return {Array<Object>} Array of users.
 */
const getBoardUsers = (boardId) => (
  (boardId && boards[boardId]) ? boards[boardId].users : []
);

/**
 * Handler for user join request.
 *
 * @param {Object} socket Socket instance
 * @param {Object} data { boardId, userName, boardName }
 */
const onJoin = (socket, { boardId, userName, boardName }) => {
  // @todo if no boardId, etc, answer user with rejection
  socket.join(boardId, () => {
    // @todo same with userName?
    if (!boardId) {
      return;
    }

    // Confirm the user he has joined the room
    socket.emit(boardsMessages.meJoined, { boardId, users : getBoardUsers(boardId) });

    // Add new user to board (also creating board if it does not exist)
    addUserToBoard(boardId, socket, boardName, userName);

    // Tell all other room users that a new user has connected to the room
    socket.to(boardId).emit(boardsMessages.otherJoined, { boardId });
  });
};

/**
 * Handle disconnection of an user.
 *
 * @param {String} socketId Id of the socket for the disconnected user.
 */
const onDisconnect = (socketId) => {
  if (!socket2board[socketId]) {
    return;
  }

  const boardId = socket2board[socketId];
  const board = boards[boardId];

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
    server.to(boardId).emit(boardsMessages.otherLeft, { userId });
  } else {
    // Remove board in case the last user left
    delete boards[boardId];
  }

  // Remove socket-board link
  delete socket2board[socketId];

  // Remove socketId-socket link
  delete id2socket[socketId];
};

const onDrawingEvent = (socketId, event, data) => {
  if (!socket2board[socketId]) {
    return;
  }

  const boardId = socket2board[socketId];
  const board = boards[boardId];

  if (!board) {
    return;
  }

  let userId;
  board.users = board.users.filter((user) => {
    if (user.socketId === socketId) {
      userId = user.id;
      return false;
    }

    return true;
  });

  const socket = id2socket[socketId];

  if (!socket) {
    console.log('!!!! @todo ERROR');
    return;
  }

  socket.to(boardId).emit(event, { userId, data });
};

/**
 * Initialize socket connection.
 */
const init = () => {
  server = io({ serveClient : false }); // @todo origins

  server.on('connection', (socket) => {
    socket.on(boardsMessages.join, onJoin.bind(this, socket));
    socket.on('disconnect', onDisconnect.bind(this, socket.id));
    socket.on('onMouseDown', onDrawingEvent.bind(this, socket.id, 'onMouseDown'));
    socket.on('onMouseDrag', onDrawingEvent.bind(this, socket.id, 'onMouseDrag'));
  });

  server.listen(process.env.SOCKETIO_PORT);
};

export default {
  init,
};
