import { Log } from '#utils';

/**
 * Remove an user from a board.
 *
 * @param {String} boardId Id of the board to remove the user from.
 * @param {String} userId Id of the user to be removed.
 *
 * @return {Integer} Number of users still on the board.
 */
export default function removeUser(boardId, userId) {
  Log.info('Services : Boards : removeUser', { boardId, userId });

  const board = this.boards[boardId];

  if (!board) {
    Log.warning('Services : Boards : removeUser : tried to remove an user from a nonexistent board', { boardId });
    return undefined;
  }

  board.users = board.users.filter((u) => u.id !== userId);

  return board.users.length;
}
