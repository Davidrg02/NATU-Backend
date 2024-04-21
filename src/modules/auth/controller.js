const db = require('../../db/mysql');
const bcrypt = require('bcrypt');
const auth = require('../../auth');

const table = 'USUARIO';
const idField = 'ID_Usuario';

async function login(Correo_usuario, password) {
    const data = await db.query(table, {Correo_usuario: Correo_usuario});
    console.log(data);
    let userData;

    let rol;
    if (data.ROL_USUARIO_ID_Rol === 3) {
        userData = await db.one("COMPRADOR", data.ID_Usuario, "USUARIO_ID_Usuario");
        rol = "Comprador";
    } else if (data.ROL_USUARIO_ID_Rol === 2){
        userData = await db.one("TIENDA", data.ID_Usuario, "USUARIO_ID_Usuario");
        rol = "Vendedor";
    } else {
        throw new Error('Usuario no encontrado');
    }
    

    return bcrypt.compare(password, data.Contraseña_encriptada)
        .then((match) => {
            if (!match) {
                throw new Error('Información inválida');
            }
            
            const body = {
                token : auth.generateToken({...data}),
                userData : userData,
                rol: rol
            }

            return body;
        });
}


async function insert(data) {

    const authData = {
        ID_Usuario: data.ID_Usuario,
        Rol_USUARIO_ID_Rol: data.Rol_USUARIO_ID_Rol
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
