const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const fichasRoutes = require("./routes/fichas");
const usuarioRoutes = require("./routes/usuario");
const pacientesRoutes = require("./routes/pacientes");

const app = express();

mongoose.connect("mongodb+srv://applesao:" + process.env.MONGO_ATLAS_PSW + "@cluster0-xjqwz.mongodb.net/node-angular?retryWrites=true")
    .then(() => {
        console.log('Conectado ao DB!');
    })
    .catch(() => {
        console.log('Falha na conexão!');
    });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, PUT, DELETE, OPTIONS");
    next();
});

app.use("/api/fichas", fichasRoutes);
app.use("/api/usuario", usuarioRoutes);
app.use("/api/pacientes", pacientesRoutes);
// cluster usuário: applesao senha: KnGVmJ7tRoWynMYQ
// mongodb+srv://applesao:<password>@cluster0-xjqwz.mongodb.net/test?retryWrites=true

module.exports = app;
