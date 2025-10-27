const express = require('express');
const router = express.Router(); 

const { createLoan, getAllLoans } = require('../controllers/loanController');

router.post('/', createLoan);

router.get('/', getAllLoans);

module.exports = router;