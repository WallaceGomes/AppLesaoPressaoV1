const express = require ("express");

const Ficha = require('../models/ficha');
const checkAuth = require("../middleware/check-auth"); //middleware para autenticar o usuário, se não estiver autenticado não pode criar, editar ou apagar ficha alguma

const router = express.Router();

router.post("", checkAuth, (req, res, next) => {
    const ficha = new Ficha({
        nome: req.body.nome,
        matricula: req.body.matricula,
        leito: req.body.leito,
        data: req.body.data,
        percepSens: req.body.percepSens,
        umidade: req.body.umidade,
        atividade: req.body.umidade,
        mobilidade: req.body.mobilidade,
        nutricao: req.body.nutricao,
        fricscisal: req.body.fricscisal,
        score: req.body.score
    });
    ficha.save().then(fichacreated => {
        res.status(201).json({
            message: 'Ficha salva com sucesso!',
            fichaId: fichacreated._id
        });
    });
});

router.put("/:id", checkAuth, (req, res, next) => {
    const ficha = new Ficha({
        _id: req.body.id,
        nome: req.body.nome,
        matricula: req.body.matricula,
        leito: req.body.leito,
        data: req.body.data,
        percepSens: req.body.percepSens,
        umidade: req.body.umidade,
        atividade: req.body.umidade,
        mobilidade: req.body.mobilidade,
        nutricao: req.body.nutricao,
        fricscisal: req.body.fricscisal,
        score: req.body.score
    })
    Ficha.updateOne({_id: req.params.id}, ficha).then(result => {
        console.log(result);
        res.status(200),json({ message: "Ficha editada com sucesso!" });
    });
});

router.get("", (req, res, next) => {
    const pageSize = +req.query.pagesize;
    const paginaAtual = +req.query.page;
    const fichaQuery = Ficha.find();
    let fichasLoad;
    if (pageSize && paginaAtual) {
        fichaQuery
        .skip(pageSize * (paginaAtual - 1))
        .limit(pageSize);
    }

    fichaQuery.then(documents => {
        res.status(200).json({
            message: 'fichas carregadas com sucesso!',
            fichas: documents
        });
    });
});

router.delete("/:id", checkAuth, (req, res, next) => {
    Ficha.deleteOne({_id: req.params.id}).then(result => {
        console.log(result);
        res.status(200).json({ message: "Ficha deletada" });
    });
});

module.exports = router;