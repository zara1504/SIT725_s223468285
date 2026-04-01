const Book = require('../models/book.model');

// Allowed fields for safe writes
const ALLOWED_FIELDS = ['id', 'title', 'author', 'year', 'genre', 'summary', 'price', 'currency'];

// Check for unexpected fields
const checkUnknownFields = (body) => {
  const unknownFields = Object.keys(body).filter(key => !ALLOWED_FIELDS.includes(key));
  return unknownFields;
};

// Return all books
const getAllBooks = () => {
  return Book.find({}).lean({ getters: true });
};

// Return a single book by id
const getBookById = (id) => {
  return Book.findOne({ id: id }).lean({ getters: true });
};

// Create a new book
const createBook = async (body) => {
  // Check for unknown fields
  const unknownFields = checkUnknownFields(body);
  if (unknownFields.length > 0) {
    throw { status: 400, message: `Unknown fields not allowed: ${unknownFields.join(', ')}` };
  }

  const book = new Book(body);
  return await book.save();
};

// Update a book by id
const updateBook = async (id, body) => {
  // Check for unknown fields
  const unknownFields = checkUnknownFields(body);
  if (unknownFields.length > 0) {
    throw { status: 400, message: `Unknown fields not allowed: ${unknownFields.join(', ')}` };
  }

  // id is immutable — reject if trying to change it
  if (body.id && body.id !== id) {
    throw { status: 400, message: 'ID is immutable and cannot be changed' };
  }

  // Remove id from body so it cannot be updated
  delete body.id;

  const book = await Book.findOneAndUpdate(
    { id: id },
    body,
    { new: true, runValidators: true, context: 'query' }
  ).lean({ getters: true });

  return book;
};

module.exports = { getAllBooks, getBookById, createBook, updateBook };