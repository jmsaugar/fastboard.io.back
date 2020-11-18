import { Log } from '#utils';

// Disable all logs for testing environment
Log.setConfig({
  all     : false,
  info    : false,
  warning : false,
  error   : false,
  debug   : false,
});
