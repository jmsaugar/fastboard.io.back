import onJoin from './onJoin';

const socketId = 123;
const boardId = '123456';
const boardName = 'board name';
const userName = 'user name';

describe('Realtime service : onJoin', () => {
  let ack;
  let socket;
  let scope;

  beforeEach(() => {
    ack = jest.fn();
    socket = {
      id   : socketId,
      join : jest.fn(),
      to   : jest.fn(() => ({
        emit : jest.fn(),
      })),
    };
    scope = {
      dependencies : {
        boardsService : {
          getBoard : jest.fn(() => ({ name : boardName })),
          addUser  : jest.fn((_, name) => ({ userName : name })),
          getUsers : jest.fn(() => []),
        },
      },
      sockets : {},
    };
  });

  test('Join board successfully', () => {
    onJoin.call(scope, socket, { boardId, userName }, ack);

    expect(ack).toHaveBeenCalledTimes(1);
    expect(ack).toHaveBeenCalledWith(true, { boardId, boardName, users : [] });
    expect(socket.join).toHaveBeenCalledTimes(1);
    expect(socket.to).toHaveBeenCalledTimes(1);
  });
});
