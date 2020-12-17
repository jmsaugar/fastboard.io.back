import { Log } from '#utils';

/**
 * Remove a board.
 *
 * @param {String} boardId Id of the board to be removed.
 */
export default function removeBoard(boardId) {
  Log.info('Service : Boards : removeBoard', { boardId });

  delete this.boards[boardId];
}
