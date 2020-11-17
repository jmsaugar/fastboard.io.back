import boardsServiceFactory from './boards';
import configServiceFactory from './config';
import realtimeServiceFactory from './realtime';

// Create service instances
const boardsService = boardsServiceFactory();
const configService = configServiceFactory();
const realtimeService = realtimeServiceFactory();

// Inject services dependencies
realtimeService.injectDependencies({ boardsService });

export {
  boardsService,
  configService,
  realtimeService,
};
