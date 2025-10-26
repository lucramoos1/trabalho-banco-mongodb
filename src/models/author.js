const mongoose = require('mongoose');

// definindo o schema do Autor
const AuthorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,  
  },
  birthDate: {
    type: Date,
    required: true,
  },
  sex: {
    type: String,
    required: true,
  },
  writingGenre: {
    type: String,
    required: true,
    enum: ['Novel', 'Poetry', 'Fantasy', 'Fiction', 'Mystery', 'Suspense'],
  }
}, {
  timestamps: true 
});

// Criando e exportando o Modelo
const Author = mongoose.model('Author', AuthorSchema);

module.exports = Author;