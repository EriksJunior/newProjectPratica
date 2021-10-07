const express = require('express')
const router = express.Router();

const home = require('../routes/home')
const cliente = require('../routes/cliente')
const produto = require('../routes/produto')



router.use('/', home)
router.use('/cliente', cliente)
router.use('/produto', produto)

module.exports = router;