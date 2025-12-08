const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: { type: String, unique: true },
    email: { type: String, unique: true },
    password: { type: String },
    roles: { type: String, enum: ['demandante', 'autoridade competente', 'equipe de planejamento', 'admin'], default: 'demandante' },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', userSchema, 'users'); 