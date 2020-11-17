import { Log } from '#utils';

import generateBoardId from './generateBoardId';

/**
 * Create a new board.
 *
 * @param {String} boardName Name of the board.
 *
 * @return {String} Id of the created board.
 */
export default function createBoard(boardName) {
  Log.info('Service : Boards : createBoard', { boardName });

  const boardId = generateBoardId.call(this);

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
