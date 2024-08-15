const db = require('../../db/mysql');

const table = 'DETALLE_ORDEN';
const idField = 'ID_Detalle_Orden';

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

function filter(idOrden) {
    return db.filter(table, idOrden, 'ORDEN_ID_Orden');
}

function ordersByUser(idUsuario) {

    // Join con la tabla ORDER para traer las ordenes de un usuario
    return db.customQuery(
        `SELECT p.Nombre_producto, p.Ruta_img_producto, p.Descripcion_breve_producto, p.ID_Producto, do.FechaHora_orden, e.Estado FROM DETALLE_ORDEN do
        JOIN ORDEN o ON do.ORDEN_ID_Orden = o.ID_Orden
        JOIN PRODUCTO p ON do.PRODUCTO_ID_Producto = p.ID_Producto
        JOIN ESTADO e ON do.ESTADO_ID_Estado = e.ID_Estado
        WHERE o.COMPRADOR_ID_Comprador = ${idUsuario}`
    )
}

module.exports = {
    all,
    one,
    insert,
    update,
    remove,
    filter,
    ordersByUser
}