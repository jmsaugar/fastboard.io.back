export const logPrefix = 'FASTBOARD';

export const envs = Object.freeze({
  dev  : 'development',
  prod : 'production',
});

export const socketIOMessages = Object.freeze({
  connection    : 'connection',
  disconnection : 'disconnect',
});

export const socketIOOrigin = process.env.NODE_ENV === envs.prod
  ? process.env.FRONT_HOST
  : 'localhost';
