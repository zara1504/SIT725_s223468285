const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const PORT = process.env.PORT || 3001;

app.use(express.static('public'));

const wishes = [];
const MAX_WISHES = 80;

io.on('connection', (socket) => {
  console.log(`User connected: ${socket.id}`);

  socket.emit('existing-wishes', wishes);

  socket.on('new-wish', (data) => {
    if (!data.text || typeof data.text !== 'string') return;
    const text = data.text.trim().slice(0, 80);
    if (!text) return;

    const wish = {
      id: Date.now() + '-' + Math.random().toString(36).slice(2, 7),
      text,
      x: parseFloat((Math.random() * 88 + 1).toFixed(2)),
      y: parseFloat((Math.random() * 75 + 5).toFixed(2)),
      size: ['sm', 'md', 'lg'][Math.floor(Math.random() * 3)],
      color: ['#fff782', '#faa4e5', '#b1e7fa', '#83ff89', '#ffb879'][Math.floor(Math.random() * 5)],
      createdAt: new Date().toLocaleTimeString(),
    };

    wishes.push(wish);
    if (wishes.length > MAX_WISHES) wishes.shift();

    io.emit('new-wish', wish);
    console.log(`New wish: "${text}"`);
  });

  socket.on('disconnect', () => {
    console.log(`User disconnected: ${socket.id}`);
  });
});

http.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});