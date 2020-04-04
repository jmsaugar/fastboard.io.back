import io from 'socket.io';

const server = io({serveClient: false});

server.on('connection', (client) => {
  console.log('!!!.connected');
});

server.listen(3000);
