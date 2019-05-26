const express = require("express");

const UsuarioController = require("../controllers/usuario");

const router = express.Router();

router.post("/cadastro", UsuarioController.cadastro);

router.post("/login", UsuarioController.login);

module.exports = router;
