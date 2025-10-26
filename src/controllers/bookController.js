const Book = require('../models/Book');
const Author = require('../models/Author'); // Precisamos verificar se o autor existe


const createBook = async (req, res) => {
  try {
    const { title, synopsis, year, author } = req.body;

    if (!title || !synopsis || !year || !author) {
      return res.status(400).json({ 
        message: 'Campos obrigatórios: title, synopsis, year, e author (ID do autor).' 
      });
    }

    const authorExists = await Author.findById(author);
    if (!authorExists) {
      return res.status(404).json({ 
        message: 'Autor não encontrado. Verifique o ID do autor fornecido.' 
      });
    }

    const newBook = new Book({
      title,
      synopsis,
      year,
      author: author
    });
    const savedBook = await newBook.save();

    res.status(201).json(savedBook);

  } catch (error) {
    if (error.name === 'ValidationError') {
        return res.status(400).json({ 
          message: 'Erro de validação.',
          details: error.message 
        });
    }

    if (error.name === 'CastError' && error.path === 'author') {
       return res.status(400).json({ 
          message: 'ID do autor em formato inválido.'
        });
    }

    console.error('Erro ao criar livro:', error);
    res.status(500).json({ message: 'Erro interno no servidor ao tentar criar o livro.' });
  }
};

const getAllBooks = async (req, res) => {
  try {
    const books = await Book.find()
      .populate('author', 'name writingGenre') 
      .sort({ title: 1 }); 

    res.status(200).json(books);

  } catch (error) {
    console.error('Erro ao buscar livros:', error);
    res.status(500).json({ message: 'Erro interno no servidor ao tentar buscar os livros.' });
  }
};

module.exports = {
  createBook,
  getAllBooks
};