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
        return res.status(500).send('ocorreu um erro ao salvar as informações do cliente')

    }
})


router.get('/listarClientes', async (req, res) => {
    try {
      await knex.table('cliente').select('*')
    } catch (error) { 
        res.status(500).send('ocorreu um ao buscar os clientes');
    }
})

router.put('/atualizarCliente', async (req, res) => {
    try {
        const { nome, sobreNome, id } = req.body;
        const dadosCliente = {nome, sobreNome}

        await knex.table('cliente').update(dadosCliente).where('id', '=', id)
        return res.status(200).json(dadosCliente)
    } catch (error) { 
        console.log(error)
        return res.status(500).send('ocorreu um erro ao atualizar os dados do cliente')     
    }
})












module.exports = router;