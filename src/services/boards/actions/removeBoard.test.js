import removeBoard from './removeBoard';

const existingBoardId = '123456';
const nonExistentBoardId = '000123';
const boardImages = ['id1', 'id2'];

describe('Boards service : removeBoard', () => {
  let scope;

  beforeEach(() => {
    scope = {
      dependencies : {
        storageService : {
          remove : jest.fn(),
        },
      },
      boards : {
        [existingBoardId] : {
          users  : [],
          images : boardImages,
        },
      },
    };
  });

  test('Remove existing board', () => {
    removeBoard.call(scope, existingBoardId);

    expect(scope.boards[existingBoardId]).toBeUndefined();
    expect(scope.dependencies.storageService.remove).toHaveBeenCalledTimes(1);
    expect(scope.dependencies.storageService.remove).toHaveBeenCalledWith(boardImages);
  });

  test('Remove nonexistent board', () => {
    removeBoard.call(scope, nonExistentBoardId);

    expect(scope.boards[existingBoardId]).not.toBeUndefined();
    expect(scope.dependencies.storageService.remove).toHaveBeenCalledTimes(0);
  });
});
