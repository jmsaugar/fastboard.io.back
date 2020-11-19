import { boardsMessages } from '#constants';

import onDisconnect from './onDisconnect';

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

describe('Realtime service : onDisconnect', () => {
  const emit = jest.fn();

  let socket;
  let scope;

  beforeEach(() => {
    socket = {
      id   : socketId,
      join : jest.fn(),
    };
    scope = {
      dependencies : {
        boardsService : {
          getBoard    : jest.fn(() => boardId),
          removeBoard : jest.fn(),
        },
      },
      sockets : {
        [socketId] : {
          boardId,
          socket,
        },
      },
      server : {
        to : jest.fn(() => ({ emit })),
      },
    };
  });

  test('Disconect from board successfully being last user in it', () => {
    scope.dependencies.boardsService.getUsers = jest.fn(() => [meUser]);
    scope.dependencies.boardsService.removeUser = jest.fn(() => 0);

    onDisconnect.call(scope, socketId);

    expect(scope.dependencies.boardsService.getBoard).toHaveBeenCalledTimes(1);
    expect(scope.dependencies.boardsService.getBoard).toHaveBeenCalledWith(boardId);
    expect(scope.dependencies.boardsService.getUsers).toHaveBeenCalledTimes(1);
    expect(scope.dependencies.boardsService.getUsers).toHaveBeenCalledWith(boardId);
    expect(scope.dependencies.boardsService.removeUser).toHaveBeenCalledTimes(1);
    expect(scope.dependencies.boardsService.removeBoard).toHaveBeenCalledTimes(1);
    expect(scope.dependencies.boardsService.removeBoard).toHaveBeenCalledWith(boardId);
    expect(scope.server.to).toHaveBeenCalledTimes(0);
  });

  test('Disconnect from board successfuly while other users in it', () => {
    scope.dependencies.boardsService.getUsers = jest.fn(() => [meUser, otherUser]);
    scope.dependencies.boardsService.removeUser = jest.fn(() => 1);

    onDisconnect.call(scope, socketId);

    expect(scope.dependencies.boardsService.getBoard).toHaveBeenCalledTimes(1);
    expect(scope.dependencies.boardsService.getBoard).toHaveBeenCalledWith(boardId);
    expect(scope.dependencies.boardsService.getUsers).toHaveBeenCalledTimes(1);
    expect(scope.dependencies.boardsService.getUsers).toHaveBeenCalledWith(boardId);
    expect(scope.dependencies.boardsService.removeUser).toHaveBeenCalledTimes(1);
    expect(scope.dependencies.boardsService.removeBoard).toHaveBeenCalledTimes(0);
    expect(scope.server.to).toHaveBeenCalledTimes(1);
    expect(emit).toHaveBeenCalledTimes(1);
    expect(emit).toHaveBeenCalledWith(boardsMessages.didLeave, { userId : meUser.id });
  });
});
