const booksService = require('../services/books.service');
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