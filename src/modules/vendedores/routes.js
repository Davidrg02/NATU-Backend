const express = require('express');

const response = require('../../network/response');
const controller = require('./controller');
const security = require('./security');


const router = express.Router();

router.get('/', all);
router.get('/:id', security(), one);
router.get('/doc/:doc', security(), oneByDoc);
router.post('/', insert);
router.put('/:id', security(), update);
router.delete('/:id', security(), remove);


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
        const user = await controller.one(req.params.id);
        response.success(req, res, user, 200);
    } catch (error) {
        next(error);
    }
};

async function oneByDoc(req, res, next) {   
    try {
        const user = await controller.oneByDoc(req.params.doc);
        response.success(req, res, user, 200);
    } catch (error) {
        next(error);
    }
}

async function insert(req, res, next) {
    try {
        const user = await controller.insert(req.body);
        response.success(req, res, "Item creado satisfactoriamente", 201);
    } catch (error) {
        next(error);
    }
};

async function update(req, res, next) {
    try {
        const user = await controller.update(req.params.id, req.body);
        response.success(req, res, "Item actualizado satisfactoriamente", 200);
    } catch (error) {
        next(error);
    }
};

async function remove(req, res, next) {
    try {
        const user = await controller.remove(req.params.id);
        response.success(req, res, "Item eliminado satisfactoriamente", 200);
    } catch (error) {
        next(error);
    }
};



module.exports = router;