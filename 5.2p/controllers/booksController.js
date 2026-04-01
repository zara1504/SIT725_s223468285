const booksService = require('../services/books.service');

exports.getAllBooks = (req, res) => {
  const items = booksService.getAllBooks();
  res.status(200).json({
    statusCode: 200,
    data: items,
    message: 'Books retrieved successfully'
  });
};

exports.getBookById = (req, res) => {
  const book = booksService.getBookById(req.params.id);
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
};