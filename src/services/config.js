import dotenv from 'dotenv';

import { Log } from '#utils';

/**
 * Start the service.
 */
function start() {
  Log.info('Service : Config : start');
  dotenv.config();
}

export default () => Object.freeze({ start });
