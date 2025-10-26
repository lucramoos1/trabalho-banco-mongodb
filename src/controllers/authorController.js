const Author = require('../models/Author');

const createAuthor = async (req, res) => {
  try {
    // 1. Extrair os dados do corpo da requisição
    const { name, birthDate, sex, writingGenre } = req.body;

    // 2. Validação básica
    if (!name || !birthDate || !sex || !writingGenre) {
      return res.status(400).json({ 
        message: 'Todos os campos são obrigatórios: name, birthDate, sex, writingGenre.' 
      });
    }

    // 3. Criar uma nova instância do modelo Author
    const newAuthor = new Author({
      name,
      birthDate,
      sex,
      writingGenre
    });

    // 4. Salvar o novo autor no banco de dados
    const savedAuthor = await newAuthor.save();

    // 5. Responder ao cliente com sucesso (HTTP 201 - Created)
    res.status(201).json(savedAuthor);

  } catch (error) {
  // Erro de duplicação
    if (error.code === 11000 && error.keyPattern && error.keyPattern.name) {
      return res.status(409).json({
        message: `Erro: Já existe um autor cadastrado com o nome '${error.keyValue.name}'.` 
      });
    }

    // Outros erros de validação do Mongoose
    if (error.name === 'ValidationError') {
        return res.status(400).json({
          message: 'Erro de validação.',
          details: error.message 
        });
    }

    // Erro genérico
    console.error('Erro ao criar autor:', error);
    res.status(500).json({ message: 'Erro interno no servidor ao tentar criar o autor.' });
  }
};

const getAllAuthors = async (req, res) => {
  try {
    // 1. Buscar todos os documentos na coleção 'authors'
    const authors = await Author.find().sort({ name: 1 });

    // 2. Responder com a lista de autores
    res.status(200).json(authors);

  } catch (error) {
    console.error('Erro ao buscar autores:', error);
    res.status(500).json({ message: 'Erro interno no servidor ao tentar buscar os autores.' });
  }
};

module.exports = {
  createAuthor,
  getAllAuthors
};