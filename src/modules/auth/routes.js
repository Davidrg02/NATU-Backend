const express = require('express');

const response = require('../../network/response');
const controller = require('./controller');

const router = express.Router();

router.get('/login', login);

async function login(req, res, next) {
    try {
        const token = await controller.login(req.params.email, req.params.password);
        response.success(req, res, token, 200);
    } catch (error) {
        response.error(req, res, error.message, 500);
    }
}



module.exports = router;