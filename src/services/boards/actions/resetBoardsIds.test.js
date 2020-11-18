import resetBoardsIds from './resetBoardsIds';

describe('Boards service : resetBoardsIds', () => {
  let scope;

  beforeEach(() => {
    scope = {
      ids : {
        all  : [3, 1, 2],
        next : 1,
      },
    };
  });

  test('Reset setting a different max id', () => {
    resetBoardsIds.call(scope, 999);

    expect(scope.ids.next).toBe(0);
    expect(scope.ids.all).toHaveLength(1000);
  });
});
