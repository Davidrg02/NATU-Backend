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
    //comprobar si ya existe el producto en el carrito, si es asi sumar las cantidades sin crear un nuevo registro
    let query = `SELECT * FROM ${tableProductos} WHERE CARRITO_ID_Carrito = ${data.CARRITO_ID_Carrito} AND PRODUCTO_ID_Producto = ${data.PRODUCTO_ID_Producto}`;
    return db.customQuery(query).then
    (result => {
        if(result.length > 0){
            let cantidad = result[0].Cantidad + data.Cantidad;
            return db.customQuery(`UPDATE ${tableProductos} SET Cantidad = ${cantidad} WHERE CARRITO_ID_Carrito = ${data.CARRITO_ID_Carrito} AND PRODUCTO_ID_Producto = ${data.PRODUCTO_ID_Producto}`);
        }else{
            return db.insert(tableProductos, data);
        }
    });
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
