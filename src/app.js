const express = require('express');
const morgan = require('morgan');
const config = require('./config');

const usuarios = require('./modules/usuarios/routes');
const vendedores = require('./modules/vendedores/routes');
const errors = require('./network/errors');

const app = express();

// Middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configure app
app.set('port', config.app.port);

// Routes
app.use('/api/users', usuarios)
app.use('/api/vendedores', vendedores)

app.use(errors);

module.exports = app;