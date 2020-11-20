import { boardsMessages } from '#constants';

import onSetBoardName from './onSetBoardName';

const socketId = 123;
const boardId = '123456';
const boardName = 'board name';

describe('Realtime service : onSetBoardName', () => {
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
          getBoard        : jest.fn(() => ({})),
          updateBoardName : jest.fn(),
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

  test('Set board name successfully', () => {
    onSetBoardName.call(scope, socketId, boardName, ack);

    expect(scope.dependencies.boardsService.getBoard).toHaveBeenCalledTimes(1);
    expect(scope.dependencies.boardsService.getBoard).toHaveBeenCalledWith(boardId);
    expect(scope.dependencies.boardsService.updateBoardName).toHaveBeenCalledTimes(1);
    expect(scope.dependencies.boardsService.updateBoardName).toHaveBeenCalledWith(
      boardId,
      boardName,
    );
    expect(ack).toHaveBeenCalledTimes(1);
    expect(ack).toHaveBeenCalledWith(true);
    expect(socket.to).toHaveBeenCalledTimes(1);
    expect(socket.to).toHaveBeenCalledWith(boardId);
    expect(emit).toHaveBeenCalledTimes(1);
    expect(emit).toHaveBeenCalledWith(boardsMessages.didSetBoardName, { boardId, boardName });
  });
});
