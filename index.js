// https://dev.to/novu/building-a-chat-app-with-socketio-and-react-2edj
const express = require('express');
const app = express();
const PORT = 3001;

const http = require('http').Server(app);
const cors = require('cors');

app.use(cors());

const socketio = require('socket.io')(http, {cors:{origin: "*"}});

socketio.on('connection', (socket) => {console.log("" + socket.id + " CONNECTED");
  socket.on('message', (message) => {
    console.log('Message:', message);
    // Broadcast the message to all connected clients
    socket.broadcast.emit('message', message);
    socket.emit('message', message); // echo back to the sender - added benefit - testing connectivity
    });
    socket.on('disconnect', () => {console.log("" + socket.id + " DISCONNECTED");});
});

app.get('/', (req, res) => {
  res.send('Hello World');
});

http.listen(PORT, () => { console.log("LISTENING ON " + PORT);})
