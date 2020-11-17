import { Log } from '#utils';

/**
 * Get all users on a given board.
 *
 * @param {String} boardId Id of the board.
 *
 * @return {Array<Object>} Array of users.
 */
export default function getUsers(boardId) {
  Log.info('Services : Boards : getUsers', { boardId });

  const board = this.boards[boardId];

  if (!board) {
    Log.warning('Services : Boards : getBoard : tried to get users from a nonexistent board', { boardId });
    return [];
  }

  return board.users;
}
