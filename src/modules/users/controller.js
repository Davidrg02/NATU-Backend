const db = require('../../db/mysql');

const table = 'USUARIO';

function all() {
    return db.all(table);
}

function one(id) { 
    return db.one(table, id, 'ID_USUARIO');
}

function insert(data) {
    return db.insert(table, data);
}

function update(id, data) {
    return db.update(table, data, id, 'ID_USUARIO');
}

function remove(id) {
    return db.remove(table, id, 'ID_USUARIO');
}

module.exports = {
    all,
    one,
    insert,
    update,
    remove
}

