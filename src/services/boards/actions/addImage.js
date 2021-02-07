import { Log } from '#utils';

/**
 * Add an image to a board.
 *
 * @param {String} boardId Id of the board.
 * @param {String} itemName Name of the image item.
 *
 * @return {Boolean} True if the image was successfully added; false otherwise.
 */
export default function addImage(boardId, itemName) {
  Log.info('Service : Boards : addImage', { boardId, itemName });

  const board = this.boards[boardId];

  if (!board) {
    Log.warning('Service : Boards : addImage : tried add an image to a nonexistent board', { boardId });
    return false;
  }

  // Add image to the board
  board.images.push(itemName);

  Log.debug('Service : Sockets : addImage : added', { boardId, itemName });

  return true;
}
