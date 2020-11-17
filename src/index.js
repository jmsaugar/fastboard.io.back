import { Log } from '#utils';
import { logPrefix, envs } from '#constants';
import { configService, boardsService, realtimeService } from '#services';

Log.init(logPrefix, {
  all     : false,
  info    : true,
  warning : true,
  error   : true,
  debug   : process.env.NODE_ENV === envs.dev,
});

configService.start();
boardsService.start();
realtimeService.start();
