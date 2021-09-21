const express = require('express')
const router = express.Router();
const uuid = require('uuid');
const knex = require('../db/database')

router.get('/', (req, res) => {

    try {
        res.status(200).render('cliente')
    } catch {
        res.status(500).send('ocorreu um erro');
    }

})


router.post('/salvarCliente', async (req, res) => {
    try {
        const { nome, sobreNome } = req.body;
        const id = uuid.v4();
        const dadosCliente = { nome, sobreNome, id }
        await knex.table('cliente').insert(dadosCliente)
        return res.status(200).json(dadosCliente)
    } catch (error) { 
        console.log(error)
        return res.status(500).send('ocorreu um erro')

    }
})











module.exports = router;