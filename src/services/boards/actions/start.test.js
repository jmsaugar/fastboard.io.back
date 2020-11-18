import start from './start';

describe('Boards service : start', () => {
  let scope;

  beforeEach(() => {
    scope = {
      ids : {
        all  : [3, 1, 2],
        next : 1,
      },
    };
  });

  test('Start service', () => {
    start.call(scope);

    expect(scope.ids.next).toBe(0);
    expect(scope.ids.all).toHaveLength(1000000);
  });
});
