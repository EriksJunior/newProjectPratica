const express = require('express')
const router = express.Router();


router.get('/', (req, res)=>{

    try {
        res.status(200).render('home')
    } catch {
        res.status(500).send('ocorreu um erro');
    }
   
})





module.exports = router;