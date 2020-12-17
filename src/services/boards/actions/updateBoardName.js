import { Log } from '#utils';

/**
 * Update the name of a board.
 *
 * @param {String} boardId Id of the board whose name is going to be updated.
 * @param {String} boardName New board name.
 */
export default function updateBoardName(boardId, boardName) {
  Log.info('Service : Boards : updateBoardname', { boardId, boardName });

  const board = this.boards[boardId];

  if (!board) {
    Log.warning('Service : Boards : updateBoardName : tried to update the name of a nonexistent board', { boardId });
    return;
  }

  board.name = boardName;
}
