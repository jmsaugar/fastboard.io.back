import injectDependencies from './injectDependencies';

const storageService = {};
const unusedDependency = {};

describe('Realtime service : injectDependencies', () => {
  let scope;

  beforeEach(() => {
    scope = {
      dependencies : {},
    };
  });

  test('Dependencies correctly injected', () => {
    injectDependencies.call(scope, { storageService });

    expect(scope.dependencies.storageService).toBe(storageService);
  });

  test('Inject both correct and unrequired dependency', () => {
    injectDependencies.call(scope, { storageService, unusedDependency });

    expect(scope.dependencies.storageService).toBe(storageService);
    expect(scope.dependencies.unusedDependency).toBeUndefined();
  });

  test('Not injecting required dependency', () => {
    expect(() => injectDependencies.call(scope, { unusedDependency })).toThrow();
  });
});
