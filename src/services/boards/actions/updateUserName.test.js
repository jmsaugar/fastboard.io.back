import updateUserName from './updateUserName';

const existingBoardId = '123456';
const nonExistentBoardId = '000123';
const existingUserId = 1;
const nonExistentUserId = 999;
const currentUserName = 'current user name';
const newUserName = 'new user name';

describe('Boards service : updateUserName', () => {
  let scope;

  beforeEach(() => {
    scope = {
      boards : {
        [existingBoardId] : {
          users : [{
            id   : existingUserId,
            name : currentUserName,
          }],
        },
      },
    };
  });

  test('Update name of existing user', () => {
    updateUserName.call(scope, existingBoardId, existingUserId, newUserName);

    expect(
      scope.boards[existingBoardId].users.find(
        ({ id }) => id === existingUserId,
      )?.name,
    ).toBe(newUserName);
  });

  test('Update name of nonexistent user on existing board', () => {
    updateUserName.call(scope, existingBoardId, nonExistentUserId, newUserName);

    expect(
      scope.boards[existingBoardId].users.find(
        ({ id }) => id === existingUserId,
      )?.name,
    ).toBe(currentUserName);
  });

  test('Update name of user on nonexistent board', () => {
    updateUserName.call(scope, nonExistentBoardId, existingUserId, newUserName);

    expect(
      scope.boards[existingBoardId].users.find(
        ({ id }) => id === existingUserId,
      )?.name,
    ).toBe(currentUserName);
  });
});
