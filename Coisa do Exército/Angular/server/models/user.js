const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: { type: String, unique: true },
    nome: { type: String, unique: true },
    email: { type: String, unique: true },
    password: { type: String },
    roles: { type: String, default: 'demandante' },
    createdAt: { type: Date, default: Date.now },
    orgao: { type: String, default: 'Departamento TI' }
});

module.exports = mongoose.model('User', userSchema, 'users'); 