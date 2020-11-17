import { Log } from '#utils';

/**
 * Reset boards ids generator.
 *
 * @param {Integer} maxId Max allowed board id
 */
export default function resetBoardsIds(maxId) {
  Log.info('Services : Boards : resetIds');

  this.ids.all = [];
  this.ids.next = 0;

  // Initial values
  for (let i = 0; i <= maxId; i += 1) {
    this.ids.all.push(i);
  }

  // Shuffle - Fisher-Yates algorithm
  for (let i = this.ids.all.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [this.ids.all[i], this.ids.all[j]] = [
      this.ids.all[j],
      this.ids.all[i],
    ];
  }
}
