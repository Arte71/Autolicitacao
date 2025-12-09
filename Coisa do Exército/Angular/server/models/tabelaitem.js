const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tabelaItemSchema = new Schema({
    tableName: { type: String, required: true },
    descricao: { type: String },
    catmat: { type: String },
    unidadeMedida: { type: String },
    quantidade_total: { type: Number },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('tabelaItem', tabelaItemSchema, 'tabelaitens'); 