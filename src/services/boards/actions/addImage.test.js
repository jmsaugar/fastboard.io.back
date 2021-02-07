import addImage from './addImage';

const existingBoardId = '123456';
const nonExistentBoardId = '000123';
const itemName = 'abc-def';

describe('Boards service : addImage', () => {
  let scope;

  beforeEach(() => {
    scope = {
      boards : {
        [existingBoardId] : {
          users  : [],
          images : [],
        },
      },
    };
  });

  test('Image is correctly added', () => {
    expect(addImage.call(scope, existingBoardId, itemName)).toBe(true);

    expect(scope.boards[existingBoardId].images).toStrictEqual([itemName]);
  });

  test('Image not added to nonexistent board', () => {
    expect(addImage.call(scope, nonExistentBoardId, itemName)).toBe(false);
    expect(scope.boards[nonExistentBoardId]).toBeUndefined();
  });
});
