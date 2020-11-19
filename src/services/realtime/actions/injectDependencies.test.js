import injectDependencies from './injectDependencies';

const boardsService = {};
const unusedDependency = {};

describe('Realtime service : injectDependencies', () => {
  let scope;

  beforeEach(() => {
    scope = {
      dependencies : {},
    };
  });

  test('Dependencies correctly injected', () => {
    injectDependencies.call(scope, { boardsService });

    expect(scope.dependencies.boardsService).toBe(boardsService);
  });

  test('Inject both correct and unrequired dependency', () => {
    injectDependencies.call(scope, { boardsService, unusedDependency });

    expect(scope.dependencies.boardsService).toBe(boardsService);
    expect(scope.dependencies.unusedDependency).toBeUndefined();
  });

  test('Not injecting required dependency', () => {
    expect(() => injectDependencies.call(scope, { unusedDependency })).toThrow();
  });
});
