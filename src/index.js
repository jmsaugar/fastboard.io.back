import { Log } from './utils';
import { configService, socketsService } from './services';

import { logPrefix } from './constants';

Log.init(logPrefix, { all : true }); // @todo read from env

configService.init();
socketsService.init();
