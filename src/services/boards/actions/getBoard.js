import { Log } from '#utils';

/**
 * Get the data of a single board.
 *
 * @param {String} boardId Id of the board to get.
 *
 * @return {Object} Board data { name, creationDate }
 */
export default function getBoard(boardId) {
  Log.info('Service : Boards : getBoard', { boardId });

  const board = this.boards[boardId];

  if (!board) {
    Log.warning('Service : Boards : getBoard : tried to get a nonexistent board', { boardId });
    return undefined;
  }

  return { name : board.name, creationDate : board.creationDate };
}
