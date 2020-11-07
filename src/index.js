import { Log } from '#utils';
import { logPrefix } from '#constants';
import { configService, realtimeService } from '#services';

Log.init(logPrefix, { all : true }); // @todo read from env

configService.init();
realtimeService.init();
