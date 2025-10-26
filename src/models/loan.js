const mongoose = require('mongoose');

const LoanSchema = new mongoose.Schema({
  user: {
    type: String,
    required: true,
  },
  book: {
    type: String,
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