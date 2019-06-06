const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const pacientesSchema = mongoose.Schema({
    nome: { type: String, required: true },
    matricula: { type: String, required: true, unique:true },
    dataInternacao: { type: String, required: true }
});

pacientesSchema.plugin(uniqueValidator); //aqui que valida se já tem um email igual cadastrado

module.exports = mongoose.model('Paciente', pacientesSchema);