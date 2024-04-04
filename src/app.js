const express = require('express');
const morgan = require('morgan');
const config = require('./config');
const cors = require('cors');

const usuarios = require('./modules/usuarios/routes');
const vendedores = require('./modules/vendedores/routes');
const compradores = require('./modules/compradores/routes');
const auth = require('./modules/auth/routes');
const productos = require('./modules/productos/routes');
const errors = require('./network/errors');

const app = express();

// Cors
app.use(cors());

// Middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configure app
app.set('port', config.app.port);

// Routes
app.use('/api/usuarios', usuarios);
app.use('/api/vendedores', vendedores);
app.use('/api/productos', productos);
app.use('/api/compradores', compradores)
app.use('/api/auth', auth);

app.use(errors);

module.exports = app;