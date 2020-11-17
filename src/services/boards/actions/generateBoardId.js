import { Log } from '#utils';

// @todo
export default function generateBoardId() {
  // return '123456';
  Log.info('Service : Boards : generateBoardId');

  const id = `${this.ids.all[this.ids.next]}`;

  this.ids.next += 1;

  return id.padStart(6, '0');
}
