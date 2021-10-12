const express = require('express')
const router = express.Router();
const uuid = require('uuid');
const knex = require('../db/database')

router.get('/', (req, res) => {

    try {
        res.status(200).render('produto')
    } catch {
        res.status(500).send('ocorreu um erro');
    }

})

router.post('/salvarProduto', async (req, res) => {
    try {
        const { nome, valorUnitario, unidade, estoque, marca } = req.body
        const id = uuid.v4();
        const dadosProduto = { id, nome, valorUnitario, unidade, estoque, marca }
        await knex
            .table('produto')
            .insert(dadosProduto)


        return res.status(200).json(dadosProduto)


    } catch (error) {
        res.status(500).send(error);
    }
})

router.get('/buscarProduto', async (req, res) => {
    try {
        const data = await knex.table('produto')
            .select('produto.id', 'produto.nome', 'produto.valorUnitario', 'produto.unidade', 'produto.estoque', 'produto.marca')
        console.log(data)
        return res.status(200).json(data)
    } catch (error) {
        console.log(error)
        return res.status(500).json(error)
    }
})

router.get('/editarProduto/:id', async (req, res) => {
    try {
        const {id} = req.params
        const data = await knex
            .table('produto')
            .select('produto.id', 'produto.nome', 'produto.valorUnitario', 'produto.unidade', 'produto.estoque', 'produto.marca')
            .where('id', '=', id)
            return res.status(200).json(data)
    } catch (error) {
        console.log(error)
    }

})
module.exports = router