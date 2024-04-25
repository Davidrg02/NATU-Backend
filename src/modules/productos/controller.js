const db = require('../../db/mysql');

const table = 'PRODUCTO';
const idField = 'ID_PRODUCTO';
const FilteredField = 'ID_Categoria';

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


//agregar a db/mysql
async function hide(id) {
    const producto = {
        Activo: data.Activo
    };

    if (producto.Activo == 1) {
        producto.Activo = 1;
    } else {
        producto.Activo = 0;
    }

    const response = await db.update(table, producto, id, idField);
}

module.exports = {
    all,
    one,
    insert,
    update,
    remove,
    filter,
    hide
}
