const User = require('../models/User');

const createUser = async (req, res) => {
  try {
    // Extrair os dados do corpo da requisição
    const { name, birthDate, sex, address } = req.body;

    // Validação básica
    if (!name || !birthDate || !sex || !address) {
      return res.status(400).json({ 
        message: 'Todos os campos são obrigatórios: name, birthDate, sex, address.' 
      });
    }

    const newUser = new User({
      name,
      birthDate,
      sex,
      address
    });

    const savedUser = await newUser.save();

    res.status(201).json(savedUser);

  } catch (error) {
   // Erro de duplicação
    if (error.code === 11000 && error.keyPattern && error.keyPattern.name) {
      return res.status(409).json({ 
        message: `Erro: Já existe um usuário cadastrado com o nome '${error.keyValue.name}'.` 
      });
    }

    if (error.name === 'ValidationError') {
        return res.status(400).json({
          message: 'Erro de validação.',
          details: error.message 
        });
    }

    console.error('Erro ao criar usuário:', error);
    res.status(500).json({ message: 'Erro interno no servidor ao tentar criar o usuário.' });
  }
};

const getAllUsers = async (req, res) => {
  try {
    // Buscar todos os documentos na coleção 'users'
    const users = await User.find().sort({ name: 1 });

    // Responder com a lista de usuários
    res.status(200).json(users);

  } catch (error) {
    console.error('Erro ao buscar usuários:', error);
    res.status(500).json({ message: 'Erro interno no servidor ao tentar buscar os usuários.' });
  }
};

module.exports = {
  createUser,
  getAllUsers
};