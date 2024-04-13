const express = require('express');

const response = require('../../network/response');
const controller = require('./controller');

const router = express.Router();

router.post('/login', login);

async function login(req, res, next) {
    try {
        const token = await controller.login(req.body.Correo_usuario, req.body.password);
        response.success(req, res, token, 200);
    } catch (error) {
        console.log("error aca");
        response.error(req, res, error.message, 500);
    }
}



module.exports = router;