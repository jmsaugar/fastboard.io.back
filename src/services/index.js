import boardsServiceFactory from './boards';
import configServiceFactory from './config';
import httpServiceFactory from './http';
import realtimeServiceFactory from './realtime';
import storageServiceFactory from './storage';

// Create service instances
const boardsService = boardsServiceFactory();
const configService = configServiceFactory();
const httpService = httpServiceFactory();
const realtimeService = realtimeServiceFactory();
const storageService = storageServiceFactory();

// Inject services dependencies
boardsService.injectDependencies({ storageService });
realtimeService.injectDependencies({ boardsService, httpService });
httpService.injectDependencies({ boardsService, storageService });

export {
  boardsService,
  configService,
  httpService,
  realtimeService,
  storageService,
};
