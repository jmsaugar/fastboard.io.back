import updateBoardName from './updateBoardName';

const existingBoardId = '123456';
const nonExistentBoardId = '000123';
const currentBoardName = 'current board name';
const newBoardName = 'new board name';

describe('Boards service : updateBoardName', () => {
  let scope;

  beforeEach(() => {
    scope = {
      boards : {
        [existingBoardId] : {
          name : currentBoardName,
        },
      },
    };
  });

  test('Update name of an existing board', () => {
    updateBoardName.call(scope, existingBoardId, newBoardName);

    expect(scope.boards[existingBoardId].name).toBe(newBoardName);
  });

  test('Update name of a nonexistent board', () => {
    updateBoardName.call(scope, nonExistentBoardId, newBoardName);

    expect(scope.boards[existingBoardId].name).toBe(currentBoardName);
  });
});
