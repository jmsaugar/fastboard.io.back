import { Log } from '#utils';

import generateUserId from './generateUserId';

/**
 * Create a new user and add it to a board.
 *
 * @param {String} boardId Id of the board.
 * @param {String} userName Name of the new user.
 * @param {String} socketId Socket id for the user.
 *
 * @return {Object} New user { id, name, socketId }.
 */
export default function addUser(boardId, userName, socketId) {
  Log.info('Service : Boards : addUserToBoard', { boardId, userName, socketId });

  const board = this.boards[boardId];

  if (!board) {
    Log.warning('Service : Boards : addUser : tried add an user to a nonexistent board', { boardId });
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
