const db = require('../../db/mysql');
const uuid = require('uuid');

const table = 'COMPRADOR';
const idField = 'ID_Comprador';
const docField = 'Documento_comprador';
const auth = require('../auth/controller');
const Direccion = require('../direcciones/controller');
const Carrito = require('../carrito/controller');


function all() {
    return db.all(table);
}

function one(id) { 
    //traer los datos del comprador junto con la direccion con su municipio y departamento
    return db.customQuery (`
    SELECT c.*, d.Direccion, d.Descripcion_adicional, m.Nombre_municipio FROM ${table} c
    JOIN DIRECCION d ON c.DIRECCION_ID_Direccion = d.ID_Direccion
    JOIN MUNICIPIO m ON d.MUNICIPIO_ID_Municipio = m.ID_Municipio
    WHERE c.${idField} = ${id}`);
}

function oneByDoc(id) { 
    return db.one(table, id, docField);
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

    await Carrito.insert({
        ID_Carrito: numericID,
        COMPRADOR_ID_Comprador: numericID
    });


    return response;
}

async function update(id, data) {
    await Direccion.update(id,{
        Direccion: data.Direccion,
        Descripcion_adicional: data.Descripcion_adicional,
        MUNICIPIO_ID_Municipio: data.MUNICIPIO_ID_Municipio
    });

    const comprador = {
        Documento_comprador: data.Documento_comprador,
        Nombres_comprador: data.Nombres_comprador,
        Apellidos_comprador: data.Apellidos_comprador,
        Telefono_comprador: data.Telefono_comprador,
        Fecha_nacimiento_comprador: data.Fecha_nacimiento_comprador,
    };

    const response = await db.update(table, comprador, id, idField);

    return response;
}

function remove(id) {
    return db.remove(table, id, idField);
}


module.exports = {
    all,
    one,
    oneByDoc,
    insert,
    update,
    remove
}

