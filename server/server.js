'use strict'

require('./config/config')

const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json 
app.use(bodyParser.json());

// por alguna razon las rutas deben de ir debajo de bodyPraser
app.use(require('./rutas/usuario'));
 

mongoose.connect(process.env.URLDB, {useNewUrlParser: true }, (err , res) =>{
    
    if(err) throw err;
    
    console.log('Conect Db');
});

app.listen(process.env.PORT, () => {
    console.log('Escuchando el puerto:', process.env.PORT);
})