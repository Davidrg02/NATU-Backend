const db = require('../../db/mysql');
const bcrypt = require('bcrypt');
const auth = require('../../auth');

const table = 'USUARIO';
const idField = 'ID_Usuario';

async function login(Correo_usuario, password) {
    const data = await db.query(table, {Correo_usuario: Correo_usuario});
    const userData = await db.one("COMPRADOR", data.ID_Usuario, "ID_Usuario");
    
    return bcrypt.compare(password, data.Contraseña_encriptada)
        .then((match) => {
            if (!match) {
                throw new Error('Invalid information');
            }
            //se devuelve el token y los datos del usuario (nombre, correo, etc.)

            

            const body = {
                token : auth.generateToken({...data}),
                userData : userData
            }

            return body;
        });
}

async function insert(data) {

    const authData = {
        ID_Usuario: data.ID_Usuario,
    }

    if(data.Correo_usuario) {
        authData.Correo_usuario = data.Correo_usuario;
    }

    if(data.Contraseña_encriptada) {
        authData.Contraseña_encriptada = await bcrypt.hash(data.Contraseña_encriptada.toString(), 10);
    }

    return db.insert(table, authData);
}

module.exports = {
    insert,
    login,
}
