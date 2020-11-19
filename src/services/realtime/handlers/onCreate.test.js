import onCreate from './onCreate';

const socketId = 123;
const boardId = '123456';
const boardName = 'board name';
const userName = 'user name';

describe('Realtime service : onCreate', () => {
  let ack;
  let socket;
  let scope;

  beforeEach(() => {
    ack = jest.fn();
    socket = {
      id   : socketId,
      join : jest.fn(),
    };
    scope = {
      dependencies : {
        boardsService : {
          createBoard : jest.fn(() => boardId),
          addUser     : jest.fn((_, name) => ({ userName : name })),
        },
      },
      sockets : {},
    };
  });

  test('Create board successfully', () => {
    onCreate.call(scope, socket, { boardName, userName }, ack);

    expect(ack).toHaveBeenCalledTimes(1);
    expect(ack).toHaveBeenCalledWith(true, { boardId, boardName });
    expect(socket.join).toHaveBeenCalledTimes(1);
    expect(scope.sockets[socketId]).toStrictEqual({ boardId, socket });
  });
});
