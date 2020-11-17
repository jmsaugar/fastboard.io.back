import { Log } from '#utils';

const maxId = 999999; // End limit for the ids range

/**
 * Start the boards service.
 */
export default function start() {
  Log.info('Service : Boards : start');

  // @todo rework this
  this.ids.all = [];
  this.ids.next = 0;

  // Initial values
  for (let i = 0; i <= maxId; i += 1) {
    this.ids.all.push(i);
  }

  // Shuffle
  for (let i = this.ids.all.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [this.ids.all[i], this.ids.all[j]] = [
      this.ids.all[j],
      this.ids.all[i],
    ];
  }
}
