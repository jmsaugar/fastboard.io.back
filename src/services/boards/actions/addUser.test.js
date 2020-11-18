import addUser from './addUser';

const userName = 'user name';
const existingBoardId = '123456';
const nonExistingBoardId = '000123';
const socketId = 123;

describe('addUser', () => {
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

  test('User is correctly added', () => {
    const newUser = addUser.call(scope, existingBoardId, userName, socketId);

    expect(scope.boards[existingBoardId].users).toHaveLength(1);
    expect(newUser.name).toBe(userName);
    expect(newUser.socketId).toBe(socketId);
  });

  test('User not added on nonexisting board', () => {
    const newUser = addUser.call(scope, nonExistingBoardId, userName, socketId);

    expect(newUser).toBeUndefined();
    expect(scope.boards[nonExistingBoardId]).toBeUndefined();
  });
});
