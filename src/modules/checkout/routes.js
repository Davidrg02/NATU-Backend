const express = require('express');

const controller = require('./controller');
const router = express.Router();

router.get('/create-order', createOrder);
router.get('/success', success);
router.get('/failure', failure);
router.get('/pending', pending);
router.post('/webhook', webhook);

async function createOrder(req, res, next) {
    try {
        await controller.createOrder(req, res);
    } catch (error) {
        next(error);
    }
}

function success(req, res, next) {
    try {
        controller.success(req, res);
    } catch (error) {
        next(error);
    }
}

function failure(req, res, next) {
    try {
        controller.failure(req, res);
    } catch (error) {
        next(error);
    }
}

function pending(req, res, next) {
    try {
        controller.pending(req, res);
    } catch (error) {
        next(error);
    }
}

function webhook(req, res, next) {
    try {
        controller.webhook(req, res);
    } catch (error) {
        next(error);
    }
}

module.exports = router;