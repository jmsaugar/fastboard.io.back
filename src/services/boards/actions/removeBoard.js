import { Log } from '#utils';

/**
 * Remove a board.
 *
 * @param {String} boardId Id of the board to be removed.
 */
export default function removeBoard(boardId) {
  Log.info('Service : Boards : removeBoard', { boardId });

  if (!this.boards[boardId]) {
    return;
  }

  // @todo what to do with this promise? only catch to log error?
  this.dependencies.storageService.remove(this.boards[boardId].images);

  delete this.boards[boardId];
}
