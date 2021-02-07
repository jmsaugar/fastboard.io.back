import { start, remove, write } from './actions';

export default () => {
  const scope = Object.seal({
    s3 : undefined,
  });

  return Object.freeze({
    start  : start.bind(scope),
    write  : write.bind(scope),
    remove : remove.bind(scope),
  });
};
