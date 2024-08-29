const db = require('../../db/mysql');

const table = 'TICKET';
const idField = 'ID_Ticket';

function all() {
    return db.all(table);
}

function one(id) { 
    return db.one(table, id, idField);
}

async function getUsuarioId(correo_usuario) {
    const query = `
        SELECT ID_Usuario 
        FROM USUARIO 
        WHERE Correo_usuario = ?
    `;
    
    const result = await db.customQuery(query, [correo_usuario]);
    return result.length > 0 ? result[0].ID_Usuario : null;
}

async function insert(data) {
    const usuarioId = await getUsuarioId(data.Correo_usuario);

    if (!usuarioId) {
        throw new Error('Usuario no encontrado.');
    }

    const query = `
        INSERT INTO TICKET (Asunto_ticket, Mensaje_ticket, Fecha_creacion, Resuelto, USUARIO_ID_Usuario)
        VALUES (?, ?, NOW(), 0, ?);
    `;

    const values = [data.Asunto_ticket, data.Mensaje_ticket, usuarioId];
    
    return db.customQuery(query, values);
}


/*
async function insert(data) {
    // Primero obtenemos el ID del usuario basado en el Correo_usuario
    const queryUser = `
        SELECT ID_Usuario 
        FROM USUARIO 
        WHERE Correo_usuario = ?;
    `;
    const userResult = await db.customQuery(queryUser, [data.Correo_usuario]);

    // Si no se encuentra un usuario con ese correo, lanzar un error
    if (userResult.length === 0) {
        throw new Error('Usuario no encontrado con el correo proporcionado.');
    }

    // Tomamos el ID_Usuario del resultado
    const usuarioId = userResult[0].ID_Usuario;

    // Ahora insertamos el ticket en la tabla TICKET
    const ticket = {
        Asunto_ticket: data.Asunto_ticket,
        Mensaje_ticket: data.Mensaje_ticket,
        Fecha_creacion: new Date(), // La fecha actual
        Resuelto: 0, // Marcado como 'No resuelto' (0)
        USUARIO_ID_Usuario: usuarioId
    };

    // Realizamos el insert en la tabla TICKET
    return db.customQuery('INSERT INTO TICKET SET ?', ticket);
}
*/    

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


