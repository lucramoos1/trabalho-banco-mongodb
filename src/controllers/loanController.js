const Loan = require('../models/Loan');
const User = require('../models/User');
const Book = require('../models/Book');

const createLoan = async (req, res) => {
  try {
    const { userId, bookId, loanDate, returnDate } = req.body;

    if (!userId || !bookId || !loanDate || !returnDate) {
      return res.status(400).json({ 
        message: 'Campos obrigatórios: userId, bookId, loanDate, returnDate.' 
      });
    }

    const userDoc = await User.findById(userId);
    if (!userDoc) {
      return res.status(404).json({ message: 'Usuário não encontrado. Verifique o userId.' });
    }

    const bookDoc = await Book.findById(bookId);
    if (!bookDoc) {
      return res.status(404).json({ message: 'Livro não encontrado. Verifique o bookId.' });
    }

    if (!bookDoc.isAvailable) {
      return res.status(409).json({ 
        message: 'Este livro já está emprestado.',
        returnDate: bookDoc.expectedReturnDate
      });
    }

    const newLoan = new Loan({
      user: userId,
      book: bookId,
      loanDate,
      returnDate
    });
    const savedLoan = await newLoan.save();

    bookDoc.isAvailable = false;
    bookDoc.expectedReturnDate = new Date(returnDate); 
    await bookDoc.save(); 

    res.status(201).json(savedLoan);

  } catch (error) {
    if (error.name === 'CastError') {
       return res.status(400).json({ 
          message: 'ID do usuário ou do livro em formato inválido.'
        });
    }

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
    const loans = await Loan.find()
      .populate('user', 'name address') 
      .populate('book', 'title') 
      .sort({ createdAt: -1 }); 

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