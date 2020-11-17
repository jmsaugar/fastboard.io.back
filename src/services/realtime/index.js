import { injectDependencies, start } from './actions';

export default () => {
  const scope = {
    dependencies : {},
    server       : {}, // Socketio server instance.
    sockets      : {}, // socketId -> { boardId, socket }
  };

  return Object.freeze({
    injectDependencies : injectDependencies.bind(scope),
    start              : start.bind(scope),
  });
};
