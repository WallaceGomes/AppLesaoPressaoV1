const express = require ("express");

const Ficha = require('../models/ficha');

const router = express.Router();

router.post("", (req, res, next) => {
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

router.put("/:id", (req, res, next) => {
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
    Ficha.find().then(documents => {
        res.status(200).json({
            message: 'fichas carregadas com sucesso!',
            fichas: documents
        });
    });
});

router.delete("/:id", (req, res, next) => {
    Ficha.deleteOne({_id: req.params.id}).then(result => {
        console.log(result);
        res.status(200).json({ message: "Ficha deletada" });
    });
});

module.exports = router;