const express = require ("express");

const PacienteControler = require("../controllers/pacientes");

const router = express.Router();

router.post("", PacienteControler.cadastro);

router.get("", PacienteControler.getPacientes);

router.get("/:id", PacienteControler.getPaciente);

router.delete("/:id", PacienteControler.deletePaciente);

module.exports = router;
