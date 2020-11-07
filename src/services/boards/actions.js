import { v4 as uuidv4 } from 'uuid';

import { Log } from '#utils';

/**
 * Generate an user id via uuid v4.
 *
 * @return {String} uuid v4 user id.
 */
function generateUserId() {
  const userId = uuidv4();

  Log.debug('Services : Boards : generateUserId', { userId });

  return userId;
}

// @todo
function generateBoardId() {
  // @todo generate boardId - cannot be 0? check restrictions on this
  return '123456';
}

/**
 * Create a new board.
 *
 * @param {String} boardName Name of the board.
 *
 * @return {String} Id of the created board.
 */
function createBoard(boardName) {
  Log.info('Service : Boards : createBoard', { boardName });

  const boardId = generateBoardId();

  const board = {
    name         : boardName,
    creationDate : new Date(),
    users        : [],
  };

  this.boards[boardId] = board;

  Log.debug('Service : Boards : createBoard : created', {
    boardId,
    board,
  });

  return boardId;
}

/**
 * Create a new user and add it to a board.
 *
 * @param {String} boardId Id of the board.
 * @param {String} userName Name of the new user.
 * @param {String} socketId Socket id for the user.
 *
 * @return {Object} New user { id, name, socketId }.
 */
function addUser(boardId, userName, socketId) {
  Log.info('Service : Boards : addUserToBoard', { boardId, userName, socketId });

  const board = this.boards[boardId];

  if (!board) {
    Log.warning('Services : Boards : addUser : tried add an user to a nonexistent board', { boardId });
    return undefined;
  }

  // Create a new user
  const newUser = {
    id   : generateUserId(),
    name : userName,
    socketId,
  };

  // Add user to the board
  board.users.push(newUser);

  Log.debug('Service : Sockets : addUserToBoard : added', { boardId, newUser });

  return newUser;
}

/**
 * Get the data of a single board.
 *
 * @param {String} boardId Id of the board to get.
 *
 * @return {Object} Board data { name, creationDate }
 */
function getBoard(boardId) {
  Log.info('Services : Boards : getBoard', { boardId });

  const board = this.boards[boardId];

  if (!board) {
    Log.warning('Services : Boards : getBoard : tried to get a nonexistent board', { boardId });
    return undefined;
  }

  return { name : board.name, creationDate : board.creationDate };
}

/**
 * Get all users on a given board.
 *
 * @param {String} boardId Id of the board.
 *
 * @return {Array<Object>} Array of users.
 */
function getUsers(boardId) {
  Log.info('Services : Boards : getUsers', { boardId });

  const board = this.boards[boardId];

  if (!board) {
    Log.warning('Services : Boards : getBoard : tried to get users from a nonexistent board', { boardId });
    return [];
  }

  return board.users;
}

/**
 * Remove an user from a board.
 *
 * @param {String} boardId Id of the board to remove the user from.
 * @param {String} userId Id of the user to be removed.
 *
 * @return {Integer} Number of users still on the board.
 */
function removeUser(boardId, userId) {
  Log.info('Services : Boards : removeUser', { boardId, userId });

  const board = this.boards[boardId];

  if (!board) {
    Log.warning('Services : Boards : removeUser : tried to remove an user from a nonexistent board', { boardId });
    return undefined;
  }

  board.users = board.users.filter((u) => u.id !== userId);

  return board.users.length;
}

/**
 * Remove a board.
 *
 * @param {String} boardId Id of the board to be removed.
 */
function removeBoard(boardId) {
  Log.info('Services : Boards : removeBoard', { boardId });

  delete this.boards[boardId];
}

/**
 * Update the name of an user.
 *
 * @param {String} boardId Id of the board the user is in.
 * @param {String} userId Id of the user whose name is going to be updated.
 * @param {String} userName New user name.
 */
function updateUserName(boardId, userId, userName) {
  Log.info('Services : Boards : updateUserName', { boardId, userId, userName });

  const board = this.boards[boardId];

  if (!board) {
    Log.warning('Services : Boards : updateUserName : tried to update the name of an user in a nonexistent board', { boardId });
    return;
  }

  board.users = board.users.map((user) => ({
    ...user,
    name : user.id === userId ? userName : user.name,
  }));
}

/**
 * Update the name of a board.
 *
 * @param {String} boardId Id of the board whose name is going to be updated.
 * @param {String} boardName New board name.
 */
function updateBoardName(boardId, boardName) {
  Log.info('Services : Boards : updateBoardname', { boardId, boardName });

  const board = this.boards[boardId];

  if (!board) {
    Log.warning('Services : Boards : updateBoardName : tried to update the name of a nonexistent board', { boardId });
    return;
  }

  board.name = boardName;
}

export {
  createBoard,
  addUser,
  getBoard,
  getUsers,
  removeUser,
  removeBoard,
  updateUserName,
  updateBoardName,
};
