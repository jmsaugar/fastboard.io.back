import { Log } from '#utils';

/**
 * Handler for board state message.
 *
 * @param {String} socketId Socket id for the user sending the message.
 * @param {String} responseMessage Message type to be sent to target user in the board.
 * @param {Object} data Board state and user id to be sent to { userId, state }
 */
export default function onBoardState(socketId, responseMessage, data, ack) {
  Log.debug('Service : Realtime : onBoardState', { userId : data.userId });

  if (!data.userId || !data.state) {
    Log.warning('Service : Realtime : onBoardState : nonexistent userId or board status', data);
    return;
  }

  if (!this.sockets[socketId]) {
    Log.warning('Service : Realtime : onBoardState : nonexistent socket association', socketId);
    return;
  }

  const { boardId, socket } = this.sockets[socketId];
  const board = this.dependencies.boardsService.getBoard(boardId);

  if (!board) {
    Log.warning('Service : Realtime : onBoardState : nonexistent board', { boardId });
    return;
  }

  const userSocketId = this.dependencies.boardsService.getUsers(boardId).find(
    (user) => user.id === data.userId,
  )?.socketId;

  if (!userSocketId || !this.sockets[userSocketId]) {
    Log.warning('Service : Realtime : onBoardState : nonexistent user socket', userSocketId);
    return;
  }

  socket.to(userSocketId).emit(responseMessage, { state : data.state });

  ack(true);
}
