const Book = require('../models/book.model');

const getAllBooks = () => {
  return Book.find({}).lean({ getters: true });
};

const getBookById = (id) => {
  return Book.findOne({ id: id }).lean({ getters: true });
};

module.exports = { getAllBooks, getBookById };