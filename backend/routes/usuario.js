const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const Usuario = require("../models/usuario");

const router = express.Router();

router.post("/cadastro", (req, res, next) => {
  bcrypt.hash(req.body.senha, 10).then(hash => {
    const usuario = new Usuario({
      email: req.body.email,
      senha: hash
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
          error: err
        });
      });
  });
});

router.post("/login", (req, res, next) => {
    let usuarioBusca;
  Usuario.findOne({ email: req.body.email })
    .then(usuario => {
      if (!usuario) {
        return res.status(401).json({
          message: "Autenticação falhou!"
        });
      }
      usuarioBusca = usuario;
      return bcrypt.compare(req.body.senha, usuario.senha);
    })
    .then(result => {
      if (!result) {
        return res.status(401).json({
          message: "Autenticação falhou!"
        });
      }
      const token = jwt.sign(
        { email: usuarioBusca.email, usuarioId: usuarioBusca._id },
        "senhamuitograndealgoritmo", // palavra para criar o hash, geralmente bem grande
        { expiresIn: "1h" }
      );
      res.status(200).json({
          token: token
      });
    })
    .catch(err => {
      return res.status(401).json({
        message: "Autenticação falhou!"
      });
    });
});

module.exports = router;
