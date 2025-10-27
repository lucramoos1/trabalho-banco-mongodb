const mongoose = require('mongoose');
const Schema = mongoose.Schema; 

const LoanSchema = new mongoose.Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User', 
    required: true,
  },
  book: {
    type: Schema.Types.ObjectId,
    ref: 'Book',
    required: true,
  },
  loanDate: {
    type: String,
    required: true,
  },
  returnDate: {
    type: String,
    required: true,
  }
}, {
  timestamps: true
});

const Loan = mongoose.model('Loan', LoanSchema);

module.exports = Loan;