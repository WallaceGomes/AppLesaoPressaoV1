const mongoose = require('mongoose');

const fichaSchema = mongoose.Schema({
    nome: { type: String, required: true },
    matricula: { type: String, required: true },
    leito: { type: String, required: true },
    data: { type: String, required: true },
    percepSens: { type: String, required: true },
    umidade: { type: String, required: true },
    atividade: { type: String, required: true },
    mobilidade: { type: String, required: true },
    nutricao: { type: String, required: true },
    fricscisal: { type: String, required: true },
    score: { type: String, required: true },
});

module.exports = mongoose.model('Ficha', fichaSchema);