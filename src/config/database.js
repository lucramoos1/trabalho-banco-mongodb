const mongoose = require('mongoose');

// Carregando a string de coenxao do mongo
const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGODB_URI;

    if (!mongoURI) {
      throw new Error('MONGODB_URI não foi definida no arquivo .env');
    }

    await mongoose.connect(mongoURI, {
      useNewUrlParser: true, 
      useUnifiedTopology: true, 
    });
    console.log('MongoDB conectado com sucesso ao Atlas!');

  } catch (err) {
    console.error('Erro ao conectar ao MongoDB:', err.message);
    process.exit(1); 
  }
};

module.exports = connectDB;