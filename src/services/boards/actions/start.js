import { Log } from '#utils';

import resetBoardsIds from './resetBoardsIds';

const maxBoardId = 999999; // End limit for the ids range

/**
 * Start the boards service.
 */
export default function start() {
  Log.info('Service : Boards : start');

  resetBoardsIds.call(this, maxBoardId);
}
