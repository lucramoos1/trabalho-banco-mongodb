const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/database');

dotenv.config();

connectDB();

const app = express();

app.use(express.json());

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send('API da Biblioteca rodando!')
});

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});