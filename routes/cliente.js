const express = require('express')
const router = express.Router();


router.get('/', (req, res)=>{

    try {
        res.status(200).render('cliente')
    } catch {
        res.status(500).send('ocorreu um erro');
    }
   
})








module.exports = router;