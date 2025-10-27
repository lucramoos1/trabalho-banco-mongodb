const Loan = require('../models/Loan');
const User = require('../models/User');
const Book = require('../models/Book');

const createLoan = async (req, res) => {
  try {
    const { user, book, loanDate, returnDate } = req.body;

    if (!user || !book || !loanDate || !returnDate) {
      return res.status(400).json({ 
        message: 'Campos obrigatórios: user (nome), book (título), loanDate, returnDate.' 
      });
    }

    const userDoc = await User.findOne({ name: user });
    if (!userDoc) {
      return res.status(404).json({ message: 'Usuário não encontrado.' });
    }

    const bookDoc = await Book.findOne({ title: book });
    if (!bookDoc) {
      return res.status(404).json({ message: 'Livro não encontrado.' });
    }

    if (!bookDoc.isAvailable) {
      return res.status(409).json({ 
        message: 'Este livro já está emprestado.',
        returnDate: bookDoc.expectedReturnDate
      });
    }

    const newLoan = new Loan({
      user,
      book,
      loanDate,
      returnDate
    });
    const savedLoan = await newLoan.save();

    bookDoc.isAvailable = false;
    bookDoc.expectedReturnDate = new Date(returnDate); 

    await bookDoc.save(); 

    res.status(201).json(savedLoan);

  } catch (error) {
    if (error.name === 'ValidationError') {
        return res.status(400).json({ 
          message: 'Erro de validação.',
          details: error.message 
        });
    }

    console.error('Erro ao criar empréstimo:', error);
    res.status(500).json({ message: 'Erro interno no servidor ao tentar criar o empréstimo.' });
  }
};

const getAllLoans = async (req, res) => {
  try {
    const loans = await Loan.find().sort({ createdAt: -1 }); 
    res.status(200).json(loans);

  } catch (error) {
    console.error('Erro ao buscar empréstimos:', error);
    res.status(500).json({ message: 'Erro interno no servidor ao tentar buscar os empréstimos.' });
  }
};

module.exports = {
  createLoan,
  getAllLoans
};