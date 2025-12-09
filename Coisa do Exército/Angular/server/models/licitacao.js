const { response } = require('express');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const licitacaoSchema = new Schema({
    tituloLicitacao: { type: String }, //
    createdAt: { type: Date, default: Date.now },
    dataConclusao: { type: Date },
    descricao: { type: String },
    items: [{ type: Schema.Types.ObjectId, ref: 'tabelaItem' }],
    orgao: { type: Schema.Types.ObjectId, ref: 'orgao' },
    idResponsavel: { type: Schema.Types.ObjectId, ref: 'User' },
    idUsuario: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    completed: { type: Boolean, default: false }
});

module.exports = mongoose.model('Licitacao', licitacaoSchema, 'licitacoes'); 