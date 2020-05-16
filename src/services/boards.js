import io from 'socket.io';

import { boardsMessages } from '../constants';

let server;

/**
 * Handler for client join request.
 *
 * @param {*} data { boardId }
 */
const onJoin = (client, { boardId }) => {
  // @todo if no boardId, etc, answer client with rejection
  client.join(boardId, () => {
    console.log('!!!.joined', boardId);

    // Confirm the client he has joined the room
    client.emit(boardsMessages.meJoined, { boardId }); // @todo differentiate this join ack from others

    // Tell all other room clients that a new client has connected to the room
    client.to(boardId).emit(boardsMessages.otherJoined, { boardId });
  });
};

/**
 * Initialize socket connection.
 */
const init = () => {
  server = io({ serveClient : false }); // @todo origins

  server.on('connection', (client) => {
    console.log('!!!.connected');

    client.on(boardsMessages.join, onJoin.bind(this, client));
  });

  server.listen(process.env.SOCKETIO_PORT);
};

export default {
  init,
};
