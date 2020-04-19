const express = require('express');
const consign = require('consign');
const mongoose = require('mongoose');
const dataBase = require('./src/config/dataBase');
const mongoConnect = require('./src/config/mongoDB');
const { host, port } = require('./.env');


const app = express();
app.dataBase = dataBase;
app.mongoDB = mongoose;

consign({
    cwd: process.cwd(),
    locale: 'pt-br',
    logger: console,
    verbose: true,
    extensions: ['.js', '.json', '.node'],
    loggingType: 'info'
})
    .include('./src/middlewares/passport.js')
    .include('./src/middlewares/middlewares.js')
    .then('./src/middlewares')
    .then('./src/utils/validator.js')
    .then('./src/controllers/querysController.js')
    .then('./src/controllers')
    .then('./src/sync')
    .then('./src/routes')
    .into(app);

app.listen(port, () => {
    console.warn( " " );
    
    console.warn("\x1b[44m", "Servidor Iniciado!" , "\x1b[0m");

    console.warn( " " );

    console.warn("\x1b[46m", `Servidor: ${host}:${port}`, "\x1b[0m");
});