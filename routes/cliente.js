const express = require('express')
const router = express.Router();
const uuid = require('uuid');


router.get('/', (req, res)=>{

    try {
        res.status(200).render('cliente')
    } catch {
        res.status(500).send('ocorreu um erro');
    }
   
})


router.post('/salvarCliente', (req, res)=>{

    try {
        const {nome, sobreNome} = req.body;
        const id = uuid.v4();
        const dadosCliente = {nome, sobreNome, id}

        console.log(dadosCliente)
    } catch {
       return res.status(500).send('ocorreu um erro')

    }
})











module.exports = router;