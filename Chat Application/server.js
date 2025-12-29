const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index1.html');
});

io.on('connection', (socket) => {
    socket.on('message', (msg) => {
        io.emit('message', msg);
    });
});

http.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});
