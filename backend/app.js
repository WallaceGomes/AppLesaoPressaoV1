const express = require('express');

const app = express();

app.use((req, res, next) => {
    console.log('Primeiro middleware');
    next();
});

app.use((req, res, next) => {
    res.send('Usando express! Teste');
});

module.exports = app;
