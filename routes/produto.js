const express = require('express')
const router = express.Router();
const uuid = require('uuid');
const knex = require('../db/database')

router.get('/', (req, res)=>{

    try {
        res.status(200).render('produto')
    } catch {
        res.status(500).send('ocorreu um erro');
    }
   
})


module.exports = router