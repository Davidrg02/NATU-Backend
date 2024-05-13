const express = require('express');

const controller = require('./controller');
const security = require('./security');
const response = require('../../network/response');
const router = express.Router();

router.get('/', all); //Listar todos los productos
router.get('/:id', one); //Listar un producto por su id
router.post('/', insert);
router.delete('/:id', security(), remove);
router.post('/producto', security() ,insertProducto);
router.delete('/producto/:id', security(), deleteProducto);
router.get('/productos/:id', security(), allProductosByCarrito);

async function all (req, res, next) {
    try {
        const list = await controller.all();
        response.success(req, res, list, 200);
    }
    catch (error) {
        next(error);
    }
}

async function one(req, res, next) {
    try {
        const carrito = await controller.one(req.params.id);
        response.success(req, res, carrito, 200);
    } catch (error) {
        next(error);
    }
}

async function insert(req, res, next) {
    try {
        const carrito = await controller.insert(req.body);
        response.success(req, res, "Item creado satisfactoriamente", 201);
    } catch (error) {
        next(error);
    }
}

async function remove(req, res, next) {
    try {
        const carrito = await controller.remove(req.params.id);
        response.success(req, res, "Item eliminado satisfactoriamente", 200);
    }
    catch (error) {
        next(error);
    }
}

async function insertProducto(req, res, next) {
    try {
        const carrito = await controller.insertProducto(req.body);
        response.success(req, res, "Producto agregado al carrito satisfactoriamente", 201);
    }
    catch (error) {
        next(error);
    }
}

async function deleteProducto(req, res, next) {
    try {
        const carrito = await controller.deleteProducto(req.params.id);
        response.success(req, res, "Producto eliminado del carrito satisfactoriamente", 200);
    }
    catch (error) {
        next(error);
    }
}

async function allProductosByCarrito(req, res, next) {
    try {
        const list = await controller.allProductosByCarrito(req.params.id);
        response.success(req, res, list, 200);
    }
    catch (error) {
        next(error);
    }
}

module.exports = router;




