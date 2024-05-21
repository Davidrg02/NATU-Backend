const jwt = require('jsonwebtoken');
const config = require('../config');
const error = require('../middleware/errors');
const secret = config.jwt.secret;

function generateToken(data) {
    // token expira en 1 mes
    return jwt.sign(data, secret, { expiresIn: '30d' });
}

function verifyToken(token) {
    return jwt.verify(token, secret);
}

const checkToken = {
    confirmToken: function (req) {
        const decoded = decodeHeaders(req);

        
    }
}

function getToken(authorization) {
    if(!authorization){
        throw error('No token', 401);
    }

    if(authorization.indexOf(`Bearer`) === -1){
        throw error(`Invalid Format`, 401);
    }

    let token = authorization.replace(`Bearer `, '');
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