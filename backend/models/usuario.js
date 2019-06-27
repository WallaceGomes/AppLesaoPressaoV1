const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const usuarioSchema = mongoose.Schema({
    email: { type: String, required: true, unique: true }, //unique: não é um impedimento para haver dois emails iguais no DB, somente otimização
    senha: { type: String, required: true },
    // nome: { type: String, required: true },
    // matricula: { type: String, required: true },
    // unidade: { type: String, required: true }
});

usuarioSchema.plugin(uniqueValidator); //aqui que valida se já tem um email igual cadastrado

module.exports = mongoose.model('Usuario', usuarioSchema);