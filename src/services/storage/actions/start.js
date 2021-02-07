import { S3 } from 'aws-sdk';

import { Log } from '#utils';

/**
 * Start the storage service.
 */
export default function start() {
  Log.info('Service : Storage : start');

  // @todo errors?
  this.s3 = new S3({
    endpoint        : process.env.STORAGE_ENDPOINT,
    accessKeyId     : process.env.STORAGE_ACCESS_KEY,
    secretAccessKey : process.env.STORAGE_SECRET_KEY,
  });
}
