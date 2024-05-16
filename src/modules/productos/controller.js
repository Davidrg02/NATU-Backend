const db = require('../../db/mysql');

const table = 'PRODUCTO';
const idField = 'ID_PRODUCTO';
const nameField = 'Nombre_Producto';
const FilteredField = 'CATEGORIA_ID_Categoria';

function all() {
    return db.all(table);
}

function one(id) { 
    return db.one(table, id, idField);
}

function insert(data) {
    return db.insert(table, data);
}

function update(id, data) {
    return db.update(table, data, id, idField);
}

function remove(id) {
    return db.remove(table, id, idField);
}

function filter(idCategoria) {
    return db.filter(table, idCategoria, FilteredField);
}

function hide(id) {
    return db.hide(table, id, idField);
}

function getProductsBySeller(idVendedor) {
    return db.filter(table, idVendedor, 'VENDEDOR_ID_Vendedor');
}

function search(name) {
    return db.search(table, nameField, name);
}

module.exports = {
    all,
    one,
    insert,
    update,
    remove,
    filter,
    hide,
    getProductsBySeller,
    search
}
