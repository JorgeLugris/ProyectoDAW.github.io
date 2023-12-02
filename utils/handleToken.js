//Importar librerías
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const moment = require('moment');

//Variables de entorno.
const JWT_SECRET = process.env.JWT_SECRET;

//Creamos el "Json Web Token".
//Debes de pasar el objeto del usuario
const tokenSign = async (user) => {
    return jwt.sign({
            _id: user._id,
            role: user.role,
            username: user.username
        },
        JWT_SECRET,
        {
            expiresIn: "30m",
        }
    );

};

//Verificamos el "Json Web Token".
// Debes de pasar el token de session el JWT
const verifyToken = async (tokenJwt) => {
    try {
        return jwt.verify(tokenJwt, JWT_SECRET)
    } catch (e) {
        return null
    }
};

//Creamos el "PIN".
const confirmAccountToken = (user) => {
    const resetToken = crypto.randomBytes(20).toString("hex");
    user.tokenConfirm = crypto.createHash("sha256").update(resetToken).digest("hex");
    return resetToken;
}

//Creamos el token("Más pequeño") porque será el PIN para restablecer la nueva contraseña.
const resetPasswordToken = (user) => {
    //Creamos el token("PIN").
    const resetToken = crypto.randomBytes(3).toString("hex");
    //Introducimos en la base de datos el "PIN" creado en formato("sha256").
    user.tokenConfirm = crypto.createHash("sha256").update(resetToken).digest("hex");
    //Introducimos en la base de datos la hora actual + 10 min. Esto es para que el "PIN" caduque pasados 10 min.
    user.resetTokenExpire = moment().add(10, 'minutes').format('hh:mm'); //hh:mm
    return resetToken;
};

//Exportamos los módulos
module.exports = {tokenSign, verifyToken, resetPasswordToken}





