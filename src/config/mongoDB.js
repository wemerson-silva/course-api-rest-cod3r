const mongoose = require('mongoose');
const { mongoDB } = require('./../../.env')
mongoose.connect(mongoDB.host , { useUnifiedTopology: true , useNewUrlParser: true })
    .catch(e => {
        console.warn( " " );
        console.warn("\x1b[41m", "Problema de conexão com o MongoDB","\x1b[0m");    
    });