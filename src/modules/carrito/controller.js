const db = require('../../db/mysql');

const table = 'CARRITO';
const idField = 'ID_Carrito';
const tableProductos = 'CARRITO_tiene_PRODUCTO';
const idFieldProductos = 'ID_CarritoProducto';

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

function insertProducto(data) {
    return db.insert(tableProductos, data);
}

function deleteProducto(idCarrito, idProducto) {
    return db.customQuery(`DELETE FROM ${tableProductos} WHERE CARRITO_ID_Carrito = ${idCarrito} AND PRODUCTO_ID_Producto = ${idProducto}`);
}

function allProductosByCarrito(id) {
    return db.customQuery(`
        SELECT p.*, tp.Cantidad 
        FROM PRODUCTO p 
        INNER JOIN ${tableProductos} tp ON p.ID_PRODUCTO = tp.PRODUCTO_ID_Producto 
        WHERE tp.CARRITO_ID_Carrito = ${id}
    `);
}


module.exports = {
    all,
    one,
    insert,
    update,
    remove,
    insertProducto,
    deleteProducto,
    allProductosByCarrito
}
