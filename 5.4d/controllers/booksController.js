const booksService = require('../services/books.service');

// GET for books
exports.getAllBooks = async (req, res) => {
  try {
    const items = await booksService.getAllBooks();
    res.status(200).json({
      statusCode: 200,
      data: items,
      message: 'Books retrieved successfully'
    });
  } catch (err) {
    res.status(500).json({
      statusCode: 500,
      data: null,
      message: 'Server error'
    });
  }
};

// GET for book id's 
exports.getBookById = async (req, res) => {
  try {
    const book = await booksService.getBookById(req.params.id);
    if (!book) {
      return res.status(404).json({
        statusCode: 404,
        data: null,
        message: 'Book not found'
      });
    }
    res.status(200).json({
      statusCode: 200,
      data: book,
      message: 'Book retrieved successfully'
    });
  } catch (err) {
    res.status(500).json({
      statusCode: 500,
      data: null,
      message: 'Server error'
    });
  }
};

// POST for books 
exports.createBook = async (req, res) => {
  try {
    const book = await booksService.createBook(req.body);
    res.status(201).json({
      statusCode: 201,
      data: book,
      message: 'Book created successfully'
    });
  } catch (err) {
    // unknown fields or immutable id
    if (err.status === 400) {
      return res.status(400).json({
        statusCode: 400,
        data: null,
        message: err.message
      });
    }
    // dupe id
    if (err.code === 11000) {
      return res.status(409).json({
        statusCode: 409,
        data: null,
        message: 'A book with this ID already exists'
      });
    }
    // mongoose validation errors
    if (err.name === 'ValidationError') {
      const messages = Object.values(err.errors).map(e => e.message);
      return res.status(400).json({
        statusCode: 400,
        data: null,
        message: messages.join(', ')
      });
    }
    res.status(500).json({
      statusCode: 500,
      data: null,
      message: 'Server error'
    });
  }
};

// PUT for the book id's
exports.updateBook = async (req, res) => {
  try {
    const book = await booksService.updateBook(req.params.id, req.body);
    if (!book) {
      return res.status(404).json({
        statusCode: 404,
        data: null,
        message: 'Book not found'
      });
    }
    res.status(200).json({
      statusCode: 200,
      data: book,
      message: 'Book updated successfully'
    });
  } catch (err) {
    // unknown fields or immutable id
    if (err.status === 400) {
      return res.status(400).json({
        statusCode: 400,
        data: null,
        message: err.message
      });
    }
    // mongoose validation errors
    if (err.name === 'ValidationError') {
      const messages = Object.values(err.errors).map(e => e.message);
      return res.status(400).json({
        statusCode: 400,
        data: null,
        message: messages.join(', ')
      });
    }
    res.status(500).json({
      statusCode: 500,
      data: null,
      message: 'Server error'
    });
  }
};