const Paciente = require("../models/pacientes");

exports.cadastro = (req, res, next) => {

    const paciente = new Paciente({
    nome: req.body.nome,
    matricula: req.body.matricula,
    dataInternacao: req.body.dataInternacao
    });
    paciente
    .save()
    .then(result => {
        res.status(201).json({
        message: "Paciente cadastrado!",
        result: result
        });
    })
    .catch(err => {
        res.status(500).json({
            message: "Paciente já existente ou formato errado!"
        });
    });
}

exports.getPacientes = (req, res, next) => {
    Paciente.find().then(documents => {
        res.status(200).json({
        message: 'Pacientes carregados com sucesso!',
        pacientes: documents
        });
    })
    .catch(error => {
        res.status(500).json({
            message: 'Falha ao carregar os pacientes'
        });
    });
}

exports.getPaciente = (req, res, next) => {
    Paciente.findById(req.params.id).then(paciente => {
        if(paciente) {
            res.status(200).json(paciente);
        } else {
            res.status(404).json({message: 'Paciente não encontrado!'})
        }
    })
    .catch(error => {
        res.status(500).json({
            message: 'Falha ao carregar o paciente'
        });
    });
}

exports.deletePaciente = (req, res, next) => {
    Paciente.deleteOne({_id: req.params.id}).then(
        result => {
        //console.log(result);
        res.status(200).json({ message: "Paciente deletado" });
    })
    .catch(error => {
        res.status(500).json({
            message: 'Não foi possível excluir o paciente'
        });
    });;
}
