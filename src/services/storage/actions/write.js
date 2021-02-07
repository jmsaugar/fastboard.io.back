import { Log } from '#utils';

const publicACL = 'public-read';

/**
 * Write a file to the underlying storage.
 *
 * @param String key Element identification key.
 * @param {Blob} body Content of the file to be written.
 *
 * @returns {Promise} Resolved with the successfully written file data; rejected otherwise.
 */
export default function write(key, body) {
  Log.debug('Service : Storage : write', { key, body : !!body });

  return new Promise((res, rej) => {
    this.s3.upload({
      Bucket : process.env.STORAGE_BUCKET_NAME,
      Key    : key,
      Body   : body,
      ACL    : publicACL,
    }, (err, data) => (err ? rej(err) : res(data)));
  });
}
