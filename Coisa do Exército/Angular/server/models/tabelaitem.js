const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tabelaItemSchema = new Schema({
    descricao: { type: String },
    catmat: { type: String },
    unidadeMedida: { type: String },
    quantidade_total: { type: Number },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('tabelaItem', tabelaItemSchema, 'tabelaitens'); 