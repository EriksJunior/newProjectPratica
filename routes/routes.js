const express = require('express')
const router = express.Router();

const home = require('../routes/home')
const cliente = require('../routes/cliente')



router.use('/', home)
router.use('/cliente', cliente)

module.exports = router;