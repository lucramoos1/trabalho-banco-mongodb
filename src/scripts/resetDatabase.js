const mongoose = require('mongoose');
const dotenv = require('dotenv');

const Author = require('../models/Author');
const User = require('../models/User');
const Book = require('../models/Book');
const Loan = require('../models/Loan');

dotenv.config();

const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGODB_URI;
    if (!mongoURI) {
      throw new Error('MONGODB_URI não foi definida no arquivo .env');
    }
    await mongoose.connect(mongoURI);
    console.log('MongoDB conectado para o script...');
  } catch (err) {
    console.error('Erro ao conectar ao MongoDB:', err.message);
    process.exit(1);
  }
};

const resetDatabase = async () => {
  try {
    await connectDB();

    console.log('Iniciando limpeza das coleções...');

    await Author.deleteMany({});
    await User.deleteMany({});
    await Book.deleteMany({});
    await Loan.deleteMany({});

    console.log('Todas as coleções foram limpas (zeradas)!');

    await mongoose.connection.close();
    console.log('MongoDB desconectado.');

    process.exit(0); 

  } catch (error) {
    console.error('Erro ao resetar o banco de dados:', error);
    await mongoose.connection.close();
    process.exit(1);
  }
};

resetDatabase();