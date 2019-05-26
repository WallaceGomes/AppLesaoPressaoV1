const express = require ("express");

const checkAuth = require("../middleware/check-auth"); //middleware para autenticar o usuário, se não estiver autenticado não pode criar, editar ou apagar ficha alguma

const router = express.Router();

const FichaController = require("../controllers/fichas");

router.post("", checkAuth, FichaController.createFicha);

router.put("/:id", checkAuth, FichaController.editFicha);

router.get("", checkAuth, FichaController.getFichas);

router.get("/:id", FichaController.getFicha);

router.delete("/:id", checkAuth, FichaController.deleteFicha);

module.exports = router;
