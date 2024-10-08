const express = require('express');
const controller = require('./controller');
const response = require('../../network/response');
const router = express.Router();

router.get('/', all);
router.get('/:id', one);
router.post('/', insert);
router.put('/:id', update);
router.delete('/:id', remove);
router.get('/orden/:idOrden', filter);
router.get('/usuario/:idUsuario', ordersByUser);

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
        const product = await controller.one(req.params.id);
        response.success(req, res, product, 200);
    } catch (error) {
        next(error);
    }
}

async function insert(req, res, next) {
    try {
        const product = await controller.insert(req.body);
        response.success(req, res, "Item creado satisfactoriamente", 201);
    } catch (error) {
        next(error);
    }
}

async function update(req, res, next) {
    try {
        const product = await controller.update(req
            .params.id, req.body);
        response.success(req, res, "Item actualizado satisfactoriamente", 200); 
    }
    catch (error) {
        next(error);
    }
}

async function remove(req, res, next) {
    try {
        const product = await controller.remove(req.params.id);
        response.success(req, res, "Item eliminado satisfactoriamente", 200);
    } catch (error) {
        next(error);
    }
}

async function filter(req, res, next) {
    try {
        const list = await controller.filter(req.params.idOrden);
        response.success(req, res, list, 200);
    } catch (error) {
        next(error);
    }
}

async function ordersByUser(req, res, next) {
    try {
        const list = await controller.ordersByUser(req.params.idUsuario);
        response.success(req, res, list, 200);
    } catch (error) {
        next(error);
    }
}


module.exports = router;
