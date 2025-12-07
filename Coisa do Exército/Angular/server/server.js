const express = require('express');
const bodyParser= require('body-parser');
const cors = require('cors');

const porta = 27071;
const app = express();
app.use(cors());

app.use(express.json());
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true }));
const rotasApi = require('./rotas/api');
app.use('/api', rotasApi);

app.get('/', cors(), async (req, res) => {
    res.send('Servidor rodando com sucesso');
});

app.listen(porta, function(){
    console.log('Servidor rodando na porta ' + porta)
})