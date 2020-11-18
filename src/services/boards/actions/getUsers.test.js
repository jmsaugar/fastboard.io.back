import getUsers from './getUsers';

const existingBoardId = '123456';
const nonExistentBoardId = '000123';
const user = {
  name : 'user name',
};

describe('Boards service : getUsers', () => {
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

  test('Get users from existing board', () => {
    const users = getUsers.call(scope, existingBoardId);

    expect(users).toHaveLength(1);
    expect(users[0]).toStrictEqual(user);
  });

  test('Get users from nonexistent boar', () => {
    const users = getUsers.call(scope, nonExistentBoardId);

    expect(users).toHaveLength(0);
  });
});
