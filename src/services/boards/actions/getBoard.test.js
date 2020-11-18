import getBoard from './getBoard';

const boardName = 'board name';
const existingBoardId = '123456';
const nonExistentBoardId = '000123';

describe('getBoard', () => {
  let scope;

  beforeEach(() => {
    scope = {
      boards : {
        [existingBoardId] : {
          name : boardName,
        },
      },
    };
  });

  test('Get existing board', () => {
    const board = getBoard.call(scope, existingBoardId);

    expect(board).not.toBeUndefined();
    expect(board.name).toBe(boardName);
  });

  test('Get nonexistent board', () => {
    const board = getBoard.call(scope, nonExistentBoardId);

    expect(board).toBeUndefined();
  });
});
