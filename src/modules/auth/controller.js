const db = require('../../db/mysql');
const bcrypt = require('bcrypt');

const table = 'USUARIO';
const idField = 'ID_Usuario';

function login(email, password) {
    return new Promise((resolve, reject) => {
        db.query(`SELECT * FROM ${table} WHERE Correo_usuario = ?`, [email], (err, result) => {
            if (err) {
                reject(err);
            }
            if (result.length === 0) {
                reject('Invalid information');
            }
            const user = result[0];
            bcrypt.compare(password, user.Contraseña_encriptada, (err, isValid) => {
                if (err) {
                    reject(err);
                }
                if (isValid) {
                    resolve('Token');
                } else {
                    reject('Invalid information');
                }
            });
        });
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
