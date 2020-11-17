import createBoard from './createBoard';

const boardName = 'board name';

describe('createBoard', () => {
  test('Board is correctly created', () => {
    const scope = {
      boards : {},
      ids    : {
        all  : [3, 1, 2],
        next : 0,
      },
    };

    const boardId = createBoard.call(scope, boardName);

    expect(scope.boards[boardId]).toBeDefined();
    expect(scope.boards[boardId].name).toBe(boardName);
    expect(scope.boards[boardId].users).toEqual([]);
  });
});
