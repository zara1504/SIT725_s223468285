const Book = require('../models/book.model');

const ALLOWED_FIELDS = ['id', 'title', 'author', 'year', 'genre', 'summary', 'price', 'currency'];

const checkUnknownFields = (body) => {
  const unknownFields = Object.keys(body).filter(key => !ALLOWED_FIELDS.includes(key));
  return unknownFields;
};

const getAllBooks = () => {
  return Book.find({}).lean({ getters: true });
};

const getBookById = (id) => {
  return Book.findOne({ id: id }).lean({ getters: true });
};

// create a new book
const createBook = async (body) => {
  const unknownFields = checkUnknownFields(body);
  if (unknownFields.length > 0) {
    throw { status: 400, message: `Unknown fields not allowed: ${unknownFields.join(', ')}` };
  }

  const book = new Book(body);
  return await book.save();
};

// update a book by id
const updateBook = async (id, body) => {
  const unknownFields = checkUnknownFields(body);
  if (unknownFields.length > 0) {
    throw { status: 400, message: `Unknown fields not allowed: ${unknownFields.join(', ')}` };
  }

  if (body.id && body.id !== id) {
    throw { status: 400, message: 'ID is immutable and cannot be changed' };
  }
  delete body.id;

  const book = await Book.findOneAndUpdate(
    { id: id },
    body,
    { new: true, runValidators: true, context: 'query' }
  ).lean({ getters: true });

  return book;
};

module.exports = { getAllBooks, getBookById, createBook, updateBook };