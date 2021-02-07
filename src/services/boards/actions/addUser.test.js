import addUser from './addUser';

const userName = 'user name';
const existingBoardId = '123456';
const nonExistentBoardId = '000123';
const socketId = 123;

describe('Boards service : addUser', () => {
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

  test('User not added to nonexistent board', () => {
    const newUser = addUser.call(scope, nonExistentBoardId, userName, socketId);

    expect(newUser).toBeUndefined();
    expect(scope.boards[nonExistentBoardId]).toBeUndefined();
  });
});
