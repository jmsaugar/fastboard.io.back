import { Log } from '#utils';

/**
 * Update the name of an user.
 *
 * @param {String} boardId Id of the board the user is in.
 * @param {String} userId Id of the user whose name is going to be updated.
 * @param {String} userName New user name.
 */
export default function updateUserName(boardId, userId, userName) {
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
