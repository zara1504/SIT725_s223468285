const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema({
  id: {
    type: String,
    required: [true, 'ID is required'],
    unique: true,
    index: true,
    trim: true,
    minlength: [2, 'ID must be at least 2 characters'],
    maxlength: [20, 'ID must be at most 20 characters'],
    match: [/^[a-zA-Z0-9_-]+$/, 'ID must only contain letters, numbers, hyphens or underscores']
  },
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
    minlength: [1, 'Title must be at least 1 character'],
    maxlength: [200, 'Title must be at most 200 characters']
  },
  author: {
    type: String,
    required: [true, 'Author is required'],
    trim: true,
    minlength: [2, 'Author must be at least 2 characters'],
    maxlength: [100, 'Author must be at most 100 characters']
  },
  year: {
    type: Number,
    required: [true, 'Year is required'],
    min: [1000, 'Year must be at least 1000'],
    max: [new Date().getFullYear(), `Year cannot be in the future`],
    validate: {
      validator: Number.isInteger,
      message: 'Year must be an integer'
    }
  },
  genre: {
    type: String,
    required: [true, 'Genre is required'],
    trim: true,
    minlength: [2, 'Genre must be at least 2 characters'],
    maxlength: [50, 'Genre must be at most 50 characters']
  },
  summary: {
    type: String,
    required: [true, 'Summary is required'],
    trim: true,
    minlength: [10, 'Summary must be at least 10 characters'],
    maxlength: [2000, 'Summary must be at most 2000 characters']
  },
  price: {
    type: mongoose.Decimal128,
    required: [true, 'Price is required'],
    get: v => v?.toString(),
    validate: {
      validator: function(v) {
        return parseFloat(v) > 0;
      },
      message: 'Price must be a positive number'
    }
  },
  currency: {
    type: String,
    required: true,
    default: 'AUD',
    enum: {
      values: ['AUD'],
      message: 'Currency must be AUD'
    }
  }
},
{
  toJSON: { getters: true, virtuals: false, transform(_doc, ret) { delete ret._v; return ret; } },
  toObject: { getters: true, virtuals: false }
});

module.exports = mongoose.model('Book', BookSchema);