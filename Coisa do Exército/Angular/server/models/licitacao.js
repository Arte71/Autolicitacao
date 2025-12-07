const { response } = require('express');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const licitacaoSchema = new Schema({
    titulo: { type: String },
    createdAt: { type: Date, default: Date.now },
    conclusaoAt: { type: Date },
    tabelaItens: [{ type: Schema.Types.ObjectId, ref: 'tabelaItem' }],
    orgao: { type: Schema.Types.ObjectId, ref: 'orgao' },
    responsavel: { type: Schema.Types.ObjectId, ref: 'User' },
    participantes: [{ type: Schema.Types.ObjectId, ref: 'User' }],
});

module.exports = mongoose.model('Licitacao', licitacaoSchema, 'licitacoes'); 