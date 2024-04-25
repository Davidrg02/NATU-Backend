const express = require('express');

const response = require('../../network/response');
const controller = require('./controller');
const security = require('./security');
const hide = require('./hide');
const router = express.Router();

router.get('/', all); //Listar todos los productos
router.get('/:id', one); //Listar un producto por su id
router.get('/categoria/:idCategoria', filter); //Categoria
router.post('/', insert);
router.put('/:id',security(), update);
//router.put('/ocultar/:id', hide());
router.delete('/:id',security(), remove);


async function all (req, res, next) {
    try {
        const list = await controller.all();
        response.success(req, res, list, 200);
    }
    catch (error) {
        next(error);
    }
};

async function one(req, res, next) {
    try {
        const product = await controller.one(req.params.id);
        response.success(req, res, product, 200);
    } catch (error) {
        next(error);
    }
};

async function insert(req, res, next) {
    try {
        const product = await controller.insert(req.body);
        response.success(req, res, "Item creado satisfactoriamente", 201);
    } catch (error) {
        next(error);
    }
};

async function update(req, res, next) {
    try {
        const product = await controller.update(req.params.id, req.body);
        response.success(req, res, "Item actualizado satisfactoriamente", 200);
    } catch (error) {
        next(error);
    }
};

async function remove(req, res, next) {
    try {
        const product = await controller.remove(req.params.id);
        response.success(req, res, "Item eliminado satisfactoriamente", 200);
    } catch (error) {
        next(error);
    }
};

async function filter(req, res, next) {
    try {
        const list = await controller.filter(req.params.idCategoria);
        response.success(req, res, list, 200);
    } catch (error) {
        next(error);
    }
}

async function hide(req, res, next) {
    try {
        const product = await controller.hide(req.params.id);
        response.success(req, res, "Item actualizado satisfactoriamente", 200);
    } catch (error) {
        next(error);
    }
}

module.exports = router;