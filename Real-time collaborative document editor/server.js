const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
    socket.on('doc-change', (text) => {
        socket.broadcast.emit('doc-change', text);
    });
});

http.listen(4000, () => {
    console.log('Document editor running on http://localhost:4000');
});
