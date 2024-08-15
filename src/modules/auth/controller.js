const db = require('../../db/mysql');
const bcrypt = require('bcrypt');
const auth = require('../../auth');
const nodemailer = require('nodemailer');
const crypto = require('crypto');

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
        userData = await db.one("VENDEDOR", data.ID_Usuario, "USUARIO_ID_Usuario");
        rol = "Vendedor";
    } else if (data.ROL_USUARIO_ID_Rol === 1){
        userData = await db.one("ADMINISTRADOR", data.ID_Usuario, "USUARIO_ID_Usuario");
        rol = "Administrador";
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
                user : userData,
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


async function recoverPassword(Correo_usuario) {
    const data = await db.query(table, {Correo_usuario: Correo_usuario});
    if (!data) {
        throw new Error('Usuario no encontrado');
    }

    const token = crypto.randomBytes(20).toString('hex');
    const tokenExpiration = Date.now() + 3600000; // 1 hora

    await db.update(table, data.ID_Usuario, {resetPasswordToken: token, resetPasswordExpires: tokenExpiration});

    const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'tu-correo@gmail.com',
            pass: 'tu-contraseña'
        }
    });

    const mailOptions = {
        to: Correo_usuario,
        from: 'passwordreset@tuapp.com',
        subject: 'Recuperación de contraseña',
        text: `Recibiste esto porque tú (o alguien más) solicitó el restablecimiento de la contraseña de tu cuenta.\n\n` +
              `Por favor, haz clic en el siguiente enlace, o copia y pega esta URL en tu navegador para completar el proceso:\n\n` +
              `http://natutienda.vercel.app/reset/${token}\n\n` +
              `Si no solicitaste esto, por favor ignora este correo y tu contraseña permanecerá sin cambios.\n`
    };

    await transporter.sendMail(mailOptions);

    return { message: 'Se ha enviado un correo con instrucciones para restablecer la contraseña' };
}


async function resetPassword(token, newPassword) {
    const data = await db.query(table, {
        resetPasswordToken: token,
        resetPasswordExpires: { $gt: Date.now() }
    });

    if (!data) {
        throw new Error('El token de restablecimiento de contraseña es inválido o ha expirado.');
    }

    const hashedPassword = await bcrypt.hash(newPassword.toString(), 10);

    await db.update(table, data.ID_Usuario, {
        Contraseña_encriptada: hashedPassword,
        resetPasswordToken: null,
        resetPasswordExpires: null
    });

    return { message: 'Contraseña actualizada correctamente' };
}



module.exports = {
    insert,
    login,
    recoverPassword,
    resetPassword
}
