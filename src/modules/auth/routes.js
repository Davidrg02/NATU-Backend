const express = require('express');

const response = require('../../network/response');
const controller = require('./controller');

const router = express.Router();

router.post('/login', login);
router.post('/recover-password', recoverPassword);
router.post('/reset-password/:token', resetPassword);

async function login(req, res, next) {
    try {
        const token = await controller.login(req.body.Correo_usuario, req.body.password);
        response.success(req, res, token, 200);
    } catch (error) {
        console.log("error aca");
        response.error(req, res, error.message, 500);
    }
}


async function recoverPassword(req, res, next) {
    try {
        const result = await controller.recoverPassword(req.body.Correo_usuario);
        response.success(req, res, result, 200);
    } catch (error) {
        response.error(req, res, error.message, 500);
    }
}

async function resetPassword(req, res, next) {
    try {
        const result = await controller.resetPassword(req.params.token, req.body.password);
        response.success(req, res, result, 200);
    } catch (error) {
        response.error(req, res, error.message, 500);
    }
}

module.exports = router;