import removeUser from './removeUser';

const existingBoardId = '123456';
const nonExistentBoardId = '000123';
const existingUserId = 123;
const nonExistentUserId = 999;
const user = {
  id   : existingUserId,
  name : 'user name',
};

describe('Boards service : removeUser', () => {
  let scope;

  beforeEach(() => {
    scope = {
      boards : {
        [existingBoardId] : {
          users : [user],
        },
      },
    };
  });

  test('Remove existing user', () => {
    const usersLeft = removeUser.call(scope, existingBoardId, existingUserId);

    expect(usersLeft).toBe(0);
    expect(scope.boards[existingBoardId].users).toHaveLength(0);
  });

  test('Remove nonexistent user on existing board', () => {
    const usersLeft = removeUser.call(scope, existingBoardId, nonExistentUserId);

    expect(usersLeft).toBe(1);
    expect(scope.boards[existingBoardId].users).toHaveLength(1);
  });

  test('Remove user from nonexistent board', () => {
    const usersLeft = removeUser.call(scope, nonExistentBoardId, existingUserId);

    expect(usersLeft).toBeUndefined();
    expect(scope.boards[existingBoardId].users).toHaveLength(1);
  });
});
