import removeBoard from './removeBoard';

const existingBoardId = '123456';
const nonExistentBoardId = '000123';

describe('Boards service : removeBoard', () => {
  let scope;

  beforeEach(() => {
    scope = {
      boards : {
        [existingBoardId] : {
          users : [],
        },
      },
    };
  });

  test('Remove existing board', () => {
    removeBoard.call(scope, existingBoardId);

    expect(scope.boards[existingBoardId]).toBeUndefined();
  });

  test('Remove nonexistent board', () => {
    removeBoard.call(scope, nonExistentBoardId);

    expect(scope.boards[existingBoardId]).not.toBeUndefined();
  });
});
