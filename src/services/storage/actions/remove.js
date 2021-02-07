import { Log } from '#utils';

/**
 * Remove a list of files from the storage.
 *
 * @param {Array<String>} Array of file names.
 *
 * @return {Promise} Resolved if successful; rejected otherwise.
 */
export default function remove(keys) {
  Log.debug('Service : Storage : remove', { keys });

  if (!Array.isArray(keys)) {
    throw new Error('Service : Storage : remove : no valid keys array');
  }

  if (!keys.length) {
    return Promise.resolve();
  }

  return new Promise((res, rej) => {
    this.s3.deleteObjects({
      Bucket : process.env.STORAGE_BUCKET_NAME,
      Delete : {
        Objects : keys.map((key) => ({ Key : key })),
      },
    }, (err, data) => (err ? rej(err) : res(data)));
  });
}
