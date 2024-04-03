const jwt = require('jsonwebtoken');
config = require('../config');

const secret = config.jwt.secret;

function generateToken(data) {
    return jwt.sign(data, secret, { expiresIn: '1h' });
}

function verifyToken(token) {
    return jwt.verify(token, secret);
}

module.exports = {
    generateToken,
    verifyToken,
}