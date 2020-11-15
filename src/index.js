import { Log } from '#utils';
import { logPrefix, envs } from '#constants';
import { configService, realtimeService } from '#services';

Log.init(logPrefix, {
  all     : false,
  info    : true,
  warning : true,
  error   : true,
  debug   : process.env.NODE_ENV === envs.dev,
});

configService.init();
realtimeService.init();
