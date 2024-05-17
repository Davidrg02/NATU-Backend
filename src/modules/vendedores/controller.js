const db = require('../../db/mysql');
const uuid = require('uuid');

const table = 'VENDEDOR';
const idField = 'ID_Vendedor';
const docField = 'Documento_vendedor';
const auth = require('../auth/controller');
const Direccion = require('../direcciones/controller');

function all() {
    return db.all(table);
}

function one(id) { 
    return db.one(table, id, idField);
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
        Rol_USUARIO_ID_Rol: 2
    });

    await Direccion.insert({
        ID_Direccion: numericID,
        Direccion: data.Direccion,
        Descripcion_adicional: data.Descripcion_adicional,
        MUNICIPIO_ID_Municipio: data.MUNICIPIO_ID_Municipio
    });
    

    const vendedor = {
        ID_Vendedor: numericID,
        Documento_vendedor: data.Documento_vendedor,
        Nombre_vendedor: data.Nombres_vendedor,
        Apellidos_vendedor: data.Apellidos_vendedor,
        Nombre_tienda: data.Nombre_tienda,
        Telefono_vendedor: data.Telefono_vendedor,
        FechaNacimiento_vendedor: data.FechaNacimiento_vendedor,
        USUARIO_ID_Usuario: numericID,
        DIRECCION_ID_Direccion: numericID
    }

    const response = await db.insert(table, vendedor);

    return response;
}


async function update(id, data) {
    await Direccion.update(id,{
        Direccion: data.Direccion,
        Descripcion_adicional: data.Descripcion_adicional,
        MUNICIPIO_ID_Municipio: data.MUNICIPIO_ID_Municipio
    });

    const vendedor = {
        Documento_vendedor: data.Documento_vendedor,
        Nombre_vendedor: data.Nombres_vendedor,
        Apellidos_vendedor: data.Apellidos_vendedor,
        Nombre_tienda: data.Nombre_tienda,
        Telefono_vendedor: data.Telefono_vendedor,
        FechaNacimiento_vendedor: data.FechaNacimiento_vendedor,
    };

    const response = await db.update(table, vendedor, id, idField);
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

