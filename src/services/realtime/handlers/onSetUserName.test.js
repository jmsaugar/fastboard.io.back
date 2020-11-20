import { boardsMessages } from '#constants';

import onSetUserName from './onSetUserName';

const socketId = 123;
const boardId = '123456';
const userId = 999;
const userName = 'user name';
const meUser = {
  id   : userId,
  name : userName,
  socketId,
};

describe('Realtime service : onSetUserName', () => {
  const emit = jest.fn();

  let ack;
  let scope;
  let socket;

  beforeEach(() => {
    ack = jest.fn();
    socket = {
      id : socketId,
      to : jest.fn(() => ({ emit })),
    };
    scope = {
      dependencies : {
        boardsService : {
          getBoard       : jest.fn(() => ({})),
          getUsers       : jest.fn(() => [meUser]),
          updateUserName : jest.fn(),
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

  test('Set user name successfully', () => {
    onSetUserName.call(scope, socketId, userName, ack);

    expect(scope.dependencies.boardsService.getBoard).toHaveBeenCalledTimes(1);
    expect(scope.dependencies.boardsService.getBoard).toHaveBeenCalledWith(boardId);
    expect(scope.dependencies.boardsService.updateUserName).toHaveBeenCalledTimes(1);
    expect(scope.dependencies.boardsService.updateUserName).toHaveBeenCalledWith(
      boardId,
      userId,
      userName,
    );
    expect(ack).toHaveBeenCalledTimes(1);
    expect(ack).toHaveBeenCalledWith(true);
    expect(socket.to).toHaveBeenCalledTimes(1);
    expect(socket.to).toHaveBeenCalledWith(boardId);
    expect(emit).toHaveBeenCalledTimes(1);
    expect(emit).toHaveBeenCalledWith(boardsMessages.didSetUserName, { userId, userName });
  });
});
