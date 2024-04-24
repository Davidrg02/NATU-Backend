const jwt = require('jsonwebtoken');
const config = require('../config');
const error = require('../middleware/errors');
const secret = config.jwt.secret;

function generateToken(data) {
    return jwt.sign(data, secret, { expiresIn: '1h' });
}

function verifyToken(token) {
    return jwt.verify(token, secret);
}

const checkToken = {
    confirmToken: function (req) {
        const decoded = decodeHeaders(req.params.headers);

        if (decoded.id !== id){
            throw error('No tienes acceso a este recurso', 401);
        }
    }
}

function getToken(authorization) {
    if(!authorization){
        throw error('No token', 401);
    }

    if(authorization.indexOf(`Bearer`) === -1){
        throw error(`Invalid Format`, 401);
    }

    let token = authorization.replace(`Bearer`, '');
    return token;
}

function decodeHeaders(req) {
    const authorization = req.headers.authorization || '';
    const token = getToken(authorization);
    const decoded = verifyToken(token);

    req.user = decoded;

    return decoded;
}



module.exports = {
    generateToken,
    checkToken,
}