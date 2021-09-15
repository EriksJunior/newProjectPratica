const express = require('express')
const app = express();
const routes  = require('./routes/routes')
const path = require('path')

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);
app.listen('3009', ()=>{
    console.log('servidor rodando na porta 3009')
})