const express = require ("express");

const checkAuth = require("../middleware/check-auth"); //middleware para autenticar o usuário, se não estiver autenticado não pode criar, editar ou apagar ficha alguma

const router = express.Router();

const FichaController = require("../controllers/fichas");

router.post("", checkAuth, FichaController.createFicha); // Cria uma ficha

router.put("/:id", checkAuth, FichaController.editFicha); // Envia uma ficha para o front editar a mesma

router.get("", checkAuth, FichaController.getFichas); // Envia todas as fichas para o front

router.get("/:id", FichaController.getFicha); // Envia uma ficha específica para o front

router.delete("/:id", checkAuth, FichaController.deleteFicha); // Deleta uma ficha

module.exports = router;
