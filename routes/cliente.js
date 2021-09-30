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
        const { nome, numero, cidade, endereco, bairro, uf, nascimento, cpfcnpj, ie, telefone, celular, obs } = req.body;
        const id = uuid.v4();
        const dadosCliente = { nome, numero, cidade, endereco, bairro, nascimento, uf, cpfcnpj, ie, telefone, celular, obs, id }
        await knex
            .table('cliente')
            .insert(dadosCliente)

        return res.status(200).json(dadosCliente)
    } catch (error) {
        console.log(error)
        return res.status(500).send('ocorreu um erro ao salvar as informações do cliente')

    }
})


router.get('/pesquisarClientes', async (req, res) => {
    try {

        const dados = await knex
            .table('cliente')
            .select('cliente.id', 'cliente.nome', 'cliente.nascimento', 'cliente.endereco', 'cliente.numero', 'cliente.cidade', 'cliente.bairro', 'cliente.uf', 'cliente.cpfcnpj', 'cliente.ie', 'cliente.telefone', 'cliente.celular', 'cliente.obs')
        res.status(200).json(dados)
        // console.log(dados)
    } catch (error) {
        res.status(500).send('ocorreu um erro ao buscar os clientes');
    }
})

router.get('/pesquisarClientes/filtro/:nomePesquisa', async (req, res) => {
    try {
        const { nomePesquisa } = req.params
        console.log(req.params)
        const dadosReturn = await knex.table('cliente')
            .select()
            .where('nome', 'like', `%${nomePesquisa}%`)
            return res.status(200).json(dadosReturn)
    } catch (error) {
        res.status(500).send('ocorreu um erro ao buscar os clientes');
    }
})

// router.put('/atualizarCliente', async (req, res) => {
//     try {
//         const { nome, sobreNome, id } = req.body;
//         const dadosCliente = { nome, sobreNome }

//         await knex.table('cliente')
//             .update(dadosCliente)
//             .where('id', '=', id)

//         return res.status(200).json(dadosCliente)
//     } catch (error) {
//         console.log(error)
//         return res.status(500).send('ocorreu um erro ao atualizar os dados do cliente')
//     }
// })

router.delete('/excluirCliente/:id', async (req, res) => {

    try {
        const { id } = req.params

        await knex.table('cliente')
            .delete()
            .where('id', '=', id)

        return res.status(200).send('Cliente deletado')
    } catch (error) {
        console.log(error)
    }



})













module.exports = router;