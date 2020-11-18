import createBoard from './createBoard';

const boardName = 'board name';

describe('Boards service : createBoard', () => {
  let scope;

  beforeEach(() => {
    scope = {
      boards : {},
      ids    : {
        all  : [3, 1, 2],
        next : 0,
      },
    };
  });

  test('Board is correctly created', () => {
    const boardId = createBoard.call(scope, boardName);

    expect(scope.boards[boardId]).toBeDefined();
    expect(scope.boards[boardId].name).toBe(boardName);
    expect(scope.boards[boardId].users).toEqual([]);
  });
});
