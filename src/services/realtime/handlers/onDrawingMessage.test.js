import onDrawingMessage from './onDrawingMessage';

const socketId = 123;
const boardId = '123456';
const meUser = {
  id : 1,
  socketId,
};
const otherUser = {
  id       : 2,
  socketId : 999,
};

const responseMessage = 'response-message';
const data = {
  point : {
    x : 1,
    y : 2,
  },
};

describe('Realtime service : onDrawingMessage', () => {
  const emit = jest.fn();

  let socket;
  let scope;

  beforeEach(() => {
    socket = {
      id : socketId,
      to : jest.fn(() => ({ emit })),
    };
    scope = {
      dependencies : {
        boardsService : {
          getBoard : jest.fn(() => boardId),
          getUsers : jest.fn(() => [meUser, otherUser]),
        },
      },
      sockets : {
        [socketId] : {
          boardId,
          socket,
        },
      },
    };
  });

  test('Correctly handle a drawing message', () => {
    onDrawingMessage.call(scope, socketId, responseMessage, data);

    expect(scope.dependencies.boardsService.getBoard).toHaveBeenCalledTimes(1);
    expect(scope.dependencies.boardsService.getBoard).toHaveBeenCalledWith(boardId);
    expect(socket.to).toHaveBeenCalledTimes(1);
    expect(socket.to).toHaveBeenCalledWith(boardId);
    expect(emit).toHaveBeenCalledTimes(1);
    expect(emit).toHaveBeenCalledWith(responseMessage, { userId : meUser.id, ...data });
  });
});
