const db = require('../../db/mysql');
const uuid = require('uuid');

const table = 'COMPRADOR';
const idField = 'ID_Comprador';
const auth = require('../auth/controller');


function all() {
    return db.all(table);
}

function one(id) { 
    return db.one(table, id, idField);
}

async function insert(data) {

    const id = uuid.v4();
    const numericID = parseInt(id.split('-')[0], 16)/2;

    await auth.insert({
        ID_Usuario: numericID,
        Correo_usuario: data.Correo_usuario,
        Contraseña_encriptada: data.Contraseña_encriptada
    });

    const comprador = {
        ID_Comprador: numericID,
        Nombres_comprador: data.Nombres_comprador,
        Dirección_comprador: data.Dirección_comprador,
        Teléfono_comprador: data.Teléfono_comprador,
        ID_Usuario: numericID
    }

    const response = await db.insert(table, comprador);

    return response;
}

function update(id, data) {
    return db.update(table, data, id, idField);
}

function remove(id) {
    return db.remove(table, id, idField);
}


module.exports = {
    all,
    one,
    insert,
    update,
    remove
}

