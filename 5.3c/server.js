const express = require('express');
const path = require('path');
const mongoose = require('mongoose');

const PORT = 3001;

mongoose.connect('mongodb://127.0.0.1:27017/booksdb');
mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB');
});

const app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const booksRoute = require('./routes/books.routes');
app.use('/api/books', booksRoute);

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// 404 handler
app.use((req, res) => res.status(404).json({ message: 'Not found' }));

// Error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: 'Server error' });
});

app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));