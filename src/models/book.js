const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  synopsis: {
    type: String,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
  author: {
    type: Schema.Types.ObjectId, 
    ref: 'Author',
    required: true,
  },
  isAvailable: {
    type: Boolean,
    required: true,
    default: true, 
  },
  expectedReturnDate: {
    type: Date,
    default: null, 
  }
}, {
  timestamps: true
});


const Book = mongoose.model('Book', BookSchema);

module.exports = Book;