import { Log } from '#utils';

/**
 * Generate new, not currently used, board id.
 *
 * @return {String} Board id.
 */
export default function generateBoardId() {
  Log.info('Service : Boards : generateBoardId');

  let id;
  do {
    if (this.ids.next >= this.ids.all.length) {
      this.ids.next = 0;
    }

    id = `${this.ids.all[this.ids.next]}`.padStart(6, '0');

    this.ids.next += 1;
  } while (this.boards[id]);

  return id;
}
