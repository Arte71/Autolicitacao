const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const User = require('../models/user');
const Event = require('../models/events');
const TabelaItem = require('../models/tabelaitem');
const Orgao = require('../models/orgao');
const Licitacao = require('../models/licitacao');

const mongoose = require('mongoose');
const db = 'mongodb://localhost:27017/loginDB';

const bcrypt = require('bcrypt');
const saltRounds = 10;

async function hashPassword(password) {
    try{const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;} catch (error) {
        console.error('Erro ao hash a senha:', error);
        throw error;
    }
}

mongoose.connect(db, {
})
.then((res) => {
console.log('Banco de dados conectado com sucesso');
})
.catch((error) => {
console.log(error);
});

function verifyToken(req, res, next) {
    if (!req.headers.authorization) {
        return res.status(401).send('Acesso não autorizado');
    }
    let token = req.headers.authorization.split(' ')[1];
    if (token === 'null') {
        return res.status(401).send('Acesso não autorizado');
    }
    let payload = jwt.verify(token, 'secretKey');
    if (!payload) {
        return res.status(401).send('Acesso não autorizado');
    }
    req.userId = payload.subject;
    next();
}

router.get('/s', async (req, res) => {
    res.send('Rota /s acessada com sucesso');
});

router.post('/register', async (req, res) => {

  try {
    let userData = req.body;
    let user = new User(userData);  
    user.password = await hashPassword(userData.password);
    let registeredUser = await user.save(); 
    let payload = { 
  subject: registeredUser._id,
  username: registeredUser.username,
  roles: registeredUser.roles
};

let token = jwt.sign(payload, 'secretKey');

res.status(200).send({
  token,
  username: registeredUser.username,
  roles: registeredUser.roles
});
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});


router.post('/login', async (req, res) => {
    console.log(req.body);
    try {
        let userData = req.body;
        let user = await User.findOne({ username: userData.username });
        
        if (!user) {
            res.status(401).send('Usuário ou senha inválida');
        } else {
            const isMatch = await bcrypt.compare(userData.password, user.password);
            if (!isMatch) {
                res.status(401).send('Usuário ou senha inválida');
            } else {

                let payload = { subject: user._id,
                username: user.username,
                roles: user.roles
                };
                let token = jwt.sign(payload, 'secretKey');
                res.status(200).send({token, username: user.username, roles: user.roles});
            }
        }
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
});

router.get('/events', async (req, res) => {
try {
    let events = await Event.find({});
    res.status(200).send(events);
} catch (error) {
    console.error(error);
    res.status(500).send(error);
}
});


module.exports = router;