const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orgaoSchema = new Schema({
    nomeOrgao: { type: String, unique: true },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Orgao', orgaoSchema, 'orgaos'); 