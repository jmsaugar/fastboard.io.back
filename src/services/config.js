import dotenv from 'dotenv';

import { Log } from '../utils';

const init = () => {
  Log.info('Service : Config : init');
  dotenv.config();
};

export default {
  init,
};
