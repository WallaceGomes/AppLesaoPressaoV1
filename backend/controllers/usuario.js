const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const Usuario = require("../models/usuario");

exports.cadastro = (req, res, next) => {
bcrypt.hash(req.body.senha, 10).then(hash => {
    const usuario = new Usuario({
    email: req.body.email,
    senha: hash,
    nome: req.body.nome,
    matricula: req.body.matricula,
    unidade: req.body.unidade
    });
    usuario
    .save()
    .then(result => {
        res.status(201).json({
        message: "Usuário criado!",
        result: result
        });
    })
    .catch(err => {
        res.status(500).json({
            message: "Usuário já existente ou formato errado!"
        });
    });
});
}

exports.login = (req, res, next) => {
    let usuarioBusca;
  Usuario.findOne({ email: req.body.email })
    .then(usuario => {
      if (!usuario) {
        return res.status(401).json({
          message: "Autenticação falhou! Email ou senha errados"
        });
      }
      usuarioBusca = usuario;
      return bcrypt.compare(req.body.senha, usuario.senha);
    })
    .then(result => {
      if (!result) {
        return res.status(401).json({
          message: "Autenticação falhou! Email ou senha errados"
        });
      }
      const token = jwt.sign(
        { email: usuarioBusca.email, usuarioId: usuarioBusca._id },
        process.env.JWT_KEY, // palavra para criar o hash, geralmente bem grande
        { expiresIn: "2h" }
      );
      res.status(200).json({
          token: token,
          expiresIn: 7200
      });
    })
    .catch(err => {
      return res.status(401).json({
        message: "Email ou senha errados!"
      });
    });
}