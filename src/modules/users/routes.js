const express = require('express');

const response = require('../../network/response');
const controller = require('./controller');

const router = express.Router();

router.get('/', all);
router.get('/:id', one);
router.post('/', insert);
router.put('/:id', update);
router.delete('/:id', remove);


async function all (req, res) {
    try {
        const list = await controller.all();
        response.success(req, res, list, 200);
    }
    catch (error) {
        response.error(req, res, 'Internal error', 500, error);
    }
};

async function one(req, res) {
    try {
        const user = await controller.one(req.params.id);
        response.success(req, res, user, 200);
    } catch (error) {
        response.error(req, res, 'Internal error', 500, error);
    }
};

async function insert(req, res) {
    try {
        const user = await controller.insert(req.body);
        response.success(req, res, user, 201);
    } catch (error) {
        response.error(req, res, 'Internal error', 500, error);
    }
};

async function update(req, res) {
    try {
        const user = await controller.update(req.params.id, req.body);
        response.success(req, res, user, 200);
    } catch (error) {
        response.error(req, res, 'Internal error', 500, error);
    }
};

async function remove(req, res, next) {
    try {
        const user = await controller.remove(req.params.id);
        response.success(req, res, user, 200);
    } catch (error) {
        next(error);
    }
};



module.exports = router;