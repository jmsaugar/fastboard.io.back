import { Log } from '#utils';
import { drawingsMessages } from '#constants';

function onDrawingEvent(socketId, event, data) {
  if (!this.sockets[socketId]) {
    return;
  }

  const { boardId } = this.sockets[socketId];
  const board = this.boards[boardId];

  if (!board) {
    return;
  }

  const userId = board.users.find((user) => user.socketId === socketId)?.id;

  const { socket } = this.sockets[socketId];

  if (!socket) {
    console.log('!!!! @todo ERROR');
    return;
  }

  socket.to(boardId).emit(event, { userId, ...data });
}

function onSetTool(socketId, { tool }) {
  Log.info('Services : sockets : onSetTool', { socketId, tool });

  if (!this.sockets[socketId]) {
    return;
  }

  const { boardId } = this.sockets[socketId];
  const board = this.boards[boardId];

  if (!board) {
    return;
  }

  const userId = board.users.find((user) => user.socketId === socketId)?.id;

  const { socket } = this.sockets[socketId];

  if (!socket) {
    console.log('!!!! @todo ERROR');
    return;
  }

  socket.to(boardId).emit(drawingsMessages.didSetTool, { userId, tool });
}

export {
  onDrawingEvent,
  onSetTool,
};
