import { v4 as uuidv4 } from 'uuid';

/**
 * Generate an user id via uuid v4.
 *
 * @return {String} uuid v4 user id.
 */
function generateUserId() {
  return uuidv4();
}

// @todo
function generateBoardId() {
  // @todo generate boardId - cannot be 0? check restrictions on this
  return 123456;
}

/**
 * Create a new board.
 *
 * @param {String} boardName Name of the board.
 *
 * @return {Integer} Id of the created board.
 */
function createBoard(boardName) {
  const boardId = generateBoardId.call(this);

  this.boards[boardId] = {
    name         : boardName,
    creationDate : new Date(),
    users        : [],
  };

  return boardId;
}

/**
 * Create a new user and add it to a board.
 *
 * @param {String} boardId Id of the board.
 * @param {String} socket Socket for the user.
 * @param {String} userName Name of the new user.
 */
function addUserToBoard(boardId, socket, userName) {
  if (!this.boards[boardId]) {
    return;
  }

  // Create a new user
  const newUser = {
    id       : generateUserId.call(this),
    name     : userName,
    socketId : socket.id,
  };

  // Add user to the board
  this.boards[boardId].users.push(newUser);

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
  return this.boards[boardId] ? this.boards[boardId].users : [];
}

export {
  createBoard,
  addUserToBoard,
  getBoardUsers,
};
