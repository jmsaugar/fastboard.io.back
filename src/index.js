import { Log } from '#utils';
import { logPrefix } from '#constants';
import { configService, socketsService } from '#services';

Log.init(logPrefix, { all : true }); // @todo read from env

configService.init();
socketsService.init();
