import { v4 as uuidv4 } from 'uuid';

import { Log } from '#utils';

/**
 * Generate an user id via uuid v4.
 *
 * @return {String} uuid v4 user id.
 */
export default function generateUserId() {
  const userId = uuidv4();

  Log.debug('Service : Boards : generateUserId', { userId });

  return userId;
}
