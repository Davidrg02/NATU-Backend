const jwt = require('jsonwebtoken');
config = require('../config');

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
    }
}

function getToken(authorization) {
    if(!authorization){
        throw new Error('No token');
    }

    if(authorization.indexOf(`Bearer`) === -1){
        throw new Error(`Invalid Format`);
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
    verifyToken,
}