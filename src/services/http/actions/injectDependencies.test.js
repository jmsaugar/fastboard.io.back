import injectDependencies from './injectDependencies';

const boardsService = {};
const storageService = {};
const unusedDependency = {};

describe('Http service : injectDependencies', () => {
  let scope;

  beforeEach(() => {
    scope = {
      dependencies : {},
    };
  });

  test('Dependencies correctly injected', () => {
    injectDependencies.call(scope, { boardsService, storageService });

    expect(scope.dependencies.boardsService).toBe(boardsService);
    expect(scope.dependencies.storageService).toBe(storageService);
  });

  test('Inject both correct and unrequired dependency', () => {
    injectDependencies.call(scope, { boardsService, storageService, unusedDependency });

    expect(scope.dependencies.boardsService).toBe(boardsService);
    expect(scope.dependencies.storageService).toBe(storageService);
    expect(scope.dependencies.unusedDependency).toBeUndefined();
  });

  test('Not injecting required dependency', () => {
    expect(() => injectDependencies.call(scope, { unusedDependency })).toThrow();
  });
});
