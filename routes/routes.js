const express = require('express')
const router = express.Router();

const cadastroPet = require('../routes/cadastroPet')



router.use('/', cadastroPet)

module.exports = router;