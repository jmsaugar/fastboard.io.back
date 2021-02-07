import { start, getServer, injectDependencies } from './actions';

export default () => {
  const scope = Object.seal({
    dependencies : {},
    app          : undefined,
    server       : undefined,

  });

  return Object.freeze({
    start              : start.bind(scope),
    getServer          : getServer.bind(scope),
    injectDependencies : injectDependencies.bind(scope),
  });
};
