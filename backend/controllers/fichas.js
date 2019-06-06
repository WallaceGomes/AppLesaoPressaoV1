const Ficha = require('../models/ficha');

exports.createFicha = (req, res, next) => {
    const ficha = new Ficha({
        nome: req.body.nome,
        matricula: req.body.matricula,
        dataInternacao: req.body.dataInternacao,
        leito: req.body.leito,
        data: req.body.data,
        percepSens: req.body.percepSens,
        umidade: req.body.umidade,
        atividade: req.body.umidade,
        mobilidade: req.body.mobilidade,
        nutricao: req.body.nutricao,
        fricscisal: req.body.fricscisal,
        score: req.body.score,
        criador: req.dadosUsuario.usuarioId
    });
    ficha.save().then(fichacreated => {
        res.status(201).json({
            message: 'Ficha salva com sucesso!',
            fichaId: fichacreated._id
        });
    })
    .catch(error => {
        res.status(500).json({
            message: 'Falha no envio da ficha!'
        });
    });
}

exports.editFicha = (req, res, next) => {
    const ficha = new Ficha({
        _id: req.body.id,
        nome: req.body.nome,
        matricula: req.body.matricula,
        dataInternacao: req.body.dataInternacao,
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
    Ficha.updateOne({_id: req.params.id}, ficha).then(result => {
        console.log(result);
        res.status(200).json({ message: "Ficha editada com sucesso!" });
    })
    .catch(error => {
        res.status(500).json({
            message: 'Falha na edição da ficha!'
        });
    });
}

exports.getFichas = (req, res, next) => {
    Ficha.find().then(documents => {
        res.status(200).json({
        message: 'fichas carregadas com sucesso!',
        fichas: documents
        });
    })
    .catch(error => {
        res.status(500).json({
            message: 'Falha ao carregar as fichas'
        });
    });
}

// Versão do getFichas com a autenticação de usuário
//5ce72a5361cba61abc8383d4 ID ADM

// exports.getFichas = (req, res, next) => {
//     if (req.dadosUsuario.usuarioId === '5ce72a5361cba61abc8383d4') {
//         Ficha.find().then(documents => {
//             res.status(200).json({
//             message: 'fichas carregadas com sucesso!',
//             fichas: documents
//             });
//         });
//     }else {
//         Ficha.find({criador: req.dadosUsuario.usuarioId}).then(documents => {
//             res.status(200).json({
//             message: 'fichas carregadas com sucesso!',
//             fichas: documents
//             });
//         })
//         .catch(error => {
//             res.status(500).json({
//                 message: 'Falha ao carregar as fichas'
//             });
//         });
//     }
// }

exports.getFicha = (req, res, next) => {
    Ficha.findById(req.params.id).then(ficha => {
        if(ficha) {
            res.status(200).json(ficha);
        } else {
            res.status(404).json({message: 'Ficha não encontrada!'})
        }
    })
    .catch(error => {
        res.status(500).json({
            message: 'Falha ao carregar a ficha'
        });
    });
}

exports.deleteFicha = (req, res, next) => {
    Ficha.deleteOne({_id: req.params.id}).then(
        result => {
        //console.log(result);
        res.status(200).json({ message: "Ficha deletada" });
    })
    .catch(error => {
        res.status(500).json({
            message: 'Não foi possível excluir a ficha'
        });
    });;
}