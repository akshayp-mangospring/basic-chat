const cors = require('cors');
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const port = 4000;

const app = express();
app.use(cors);

const server = http.createServer(app);

// Socket Server
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST']
  }
});

io.on('connection', (socket) => {
  console.log(`User Connected: ${socket.id}`);

  socket.on('message', ({ message }) => {
    // Server Emits to every connected client
    io.emit('publish_message', {
      success: 200,
      msg: message
    });

    // Server Emits to every connected client except sender
    // socket.broadcast.emit('publish_message', {
    //   success: 200,
    //   msg: message
    // });
  });
});

server.listen(port, () => {
  console.log(`Server is running at ${port}`);
});
