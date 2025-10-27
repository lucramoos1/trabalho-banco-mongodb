const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/database');

const authorRoutes = require('./routes/authorRoutes'); 
const userRoutes = require('./routes/userRoutes.js');
const bookRoutes = require('./routes/bookRoutes');
const loanRoutes = require('./routes/loanRoutes');

dotenv.config();

connectDB();

const app = express();

app.use(express.json());

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send('API da Biblioteca rodando!')
});

app.use('/api/authors', authorRoutes);

app.use('/api/users', userRoutes);

app.use('/api/books', bookRoutes);

app.use('/api/loans', loanRoutes);

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});