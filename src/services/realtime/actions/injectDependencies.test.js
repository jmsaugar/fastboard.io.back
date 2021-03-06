import injectDependencies from './injectDependencies';

const boardsService = {};
const httpService = {};
const unusedDependency = {};

describe('Realtime service : injectDependencies', () => {
  let scope;

  beforeEach(() => {
    scope = {
      dependencies : {},
    };
  });

  test('Dependencies correctly injected', () => {
    injectDependencies.call(scope, { boardsService, httpService });

    expect(scope.dependencies.boardsService).toBe(boardsService);
    expect(scope.dependencies.httpService).toBe(httpService);
  });

  test('Inject both correct and unrequired dependency', () => {
    injectDependencies.call(scope, { boardsService, httpService, unusedDependency });

    expect(scope.dependencies.boardsService).toBe(boardsService);
    expect(scope.dependencies.httpService).toBe(httpService);
    expect(scope.dependencies.unusedDependency).toBeUndefined();
  });

  test('Not injecting required dependency', () => {
    expect(() => injectDependencies.call(scope, { unusedDependency })).toThrow();
  });
});
