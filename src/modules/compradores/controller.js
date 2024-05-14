const db = require('../../db/mysql');
const uuid = require('uuid');

const table = 'COMPRADOR';
const idField = 'ID_Comprador';
const auth = require('../auth/controller');
const Direccion = require('../direcciones/controller');
const Carrito = require('../carrito/controller');


function all() {
    return db.all(table);
}

function one(id) { 
    return db.one(table, id, idField);
}

async function insert(data) {

    const id = uuid.v4();
    const numericID = parseInt(parseInt(id.split('-')[0], 16)/2);

    await auth.insert({
        ID_Usuario: numericID,
        Correo_usuario: data.Correo_usuario,
        Contraseña_encriptada: data.Contraseña_encriptada,
        Rol_USUARIO_ID_Rol: 3
    });

    await Direccion.insert({
        ID_Direccion: numericID,
        Direccion: data.Direccion,
        Descripcion_adicional: data.Descripcion_adicional,
        MUNICIPIO_ID_Municipio: data.MUNICIPIO_ID_Municipio
    });
    
    await Carrito.insert({
        ID_Carrito: numericID,
        USUARIO_ID_Usuario: numericID
    });

    const comprador = {
        ID_Comprador: numericID,
        Documento_comprador: data.Documento_comprador,
        Nombres_comprador: data.Nombres_comprador,
        Apellidos_comprador: data.Apellidos_comprador,
        Telefono_comprador: data.Telefono_comprador,
        Fecha_nacimiento_comprador: data.Fecha_nacimiento_comprador,
        USUARIO_ID_Usuario: numericID,
        DIRECCION_ID_Direccion: numericID
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

