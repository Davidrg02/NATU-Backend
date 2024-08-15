const express = require('express');
const morgan = require('morgan');
const config = require('./config');
const cors = require('cors');

const usuarios = require('./modules/usuarios/routes');
const vendedores = require('./modules/vendedores/routes');
const compradores = require('./modules/compradores/routes');
const auth = require('./modules/auth/routes');
const productos = require('./modules/productos/routes');
const departamentos = require('./modules/departamentos/routes');
const municipios = require('./modules/municipios/routes');
const direcciones = require('./modules/direcciones/routes');
const categorias = require('./modules/categorias/routes');
const checkout = require('./modules/checkout/routes');
const carrito = require('./modules/carrito/routes');
const ordenes = require('./modules/ordenes/routes');
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
app.use('/api/compradores', compradores);
app.use('/api/departamentos', departamentos);
app.use('/api/municipios', municipios);
app.use('/api/direcciones', direcciones);
app.use('/api/categorias', categorias);
app.use('/api/auth', auth);
app.use('/api/checkout', checkout);
app.use('/api/carrito', carrito);
app.use('/api/ordenes', ordenes);

app.use(errors);

module.exports = app;