// Importar librerías
const {matchedData} = require("express-validator");
const moment = require('moment');
const crypto = require("crypto");

// Importar módulos de Node.js
const {encrypt, compare} = require("../utils/handlePassword");
const userModel = require("../models/user");
const {tokenSign, resetPasswordToken, confirmAccountToken} = require("../utils/handleToken");
const {handleHttpError} = require("../utils/handleError");
const sendEmail = require("../utils/sendEmail");
const {packageModel} = require("../models");

const PUBLIC_URL = process.env.PUBLIC_URL || null;
const MEDIA_PATH = `${__dirname}/../storage`;


// Controlador encargado de registrar usuario
const registerCtrl = async (req, res) => {
    //Try/catch por si ocurre algún error.
    try {

        const {body} = req;

        //Comprueba si existe el email en la base de datos
        const emailExist = await userModel.findOne({email: body.email});
        //Si existe el email retorna un error "El email ya existe".
        if (emailExist) return handleHttpError(res, "EMAIL_EXIST", 403);

        //Comprueba si existe el usuario
        const userExist = await userModel.findOne({username: body.username});
        //Si existe el usuario retorna un error "El usuario ya existe".
        if (userExist) return handleHttpError(res, "USER_EXIST", 403);

        //Encripta la contraseña
        const password = await encrypt(body.password);

        const {file} = req;
        const filename = file.filename
        const url = `${PUBLIC_URL}/${file.filename}`


        //Todos los datos que ha introducido el usuario se introducen en una variable.
        const data = {...body, password, filename, url /*role: 'ADMIN'*/}



        //guardamos en la base de datos los campos
        const user = await userModel.create(data);

        //Creamos un token(numero secreto).
        const tokenConfirm = resetPasswordToken(user);
        //Lo guardamos en la base de datos.
        await user.save({tokenConfirm});

        //Creamos una constate con la URL.
        const resetUrl = `${process.env.PUBLIC_URL}/account/${tokenConfirm}`;

        //Variable del mensaje que se le enviará al usuario.
        const message = `
        <h1>Tu tienes un nuevo correo de confirmación de cuenta</h1>
        <p>Por favor dirígese a este link para confirmar su cuenta</p>
        <a href=${resetUrl} clicktracking=off>${resetUrl}</a>`

        //Enviamos el mensaje.
        await sendEmail({
            to: user.email,
            subject: "confirmar cuenta",
            text: message,
        });


        //Try/catch por si ocurre algún error.
        try {
            //Lo enviamos al "frontEnd"
            res.send(user);

        } catch (e) {
            //Retornamos un error
            return handleHttpError(res, "EMAIL_NOT_SENT", 404);

        }

    } catch (e) {
        //En caso de error.
        handleHttpError(res, "ERROR_REGISTER_USER", 403);
    }
}


// Controlador encargado de validar la cuenta de usuario
const accountAceptedCtrl = async (req, res) => {
    //Obtenemos el token de la url(método "get").
    const {token} = req.params;
    //Lo transformamos al "sha256".
    const tokenConfirm = crypto.createHash("sha256").update(token).digest("hex");

    //Try/catch por si hay algún error.
    try {
        //Buscamos ese token en la base de datos y actualizamos los 2 campos.
        const user = await userModel.findOneAndUpdate({tokenConfirm}, {cuentaConfirmada: true, tokenConfirm: null});
        //Sino existe usuario retorna un error.
        if (!user) return handleHttpError(res, 'USER_NOT_EXIST', 403);
        //Lo enviamos al "frontEnd"
        res.send(user);

    } catch (e) {
        //En caso de error.
        handleHttpError(res, "ERROR_REGISTER_USER", 403);
    }
};


// Controlador encargado de loguear a una persona
const loginCtrl = async (req, res) => {
    //try/catch por si hay algún error.
    try {
        //obtenemos los datos que ha introducido el usuario en el formulario.
        const body = matchedData(req);

        //Buscamos al usuario en la base de datos por el email.
        const user = await userModel.findOne({email: body.email},);

        //Sino existe el usuario retornamos un error.
        if (!user) return handleHttpError(res, "ERROR AUTHENTICATION", 404);

        //Sino existe cuenta confirmada retornamos un error.
        if (!user.cuentaConfirmada) return handleHttpError(res, 'ACCOUNT_NOT_CONFIRM', 403);

        //Creamos una variable y metemos la contraseña.
        const hashPassword = user.password;
        //Comparamos la contraseña introducida por el usuario con la de la base de datos.Devuelve "true" o "false"
        const check = await compare(body.password, hashPassword)
        //Si el resultado es "false" retornamos un error.
        if (!check) return handleHttpError(res, "ERROR AUTHENTICATION", 401);

        //Creamos un token con "JWT" para saber que ha iniciado sesión. Similar al uso de sesiones.
        const token = await tokenSign(user);

        //Lo enviamos al "frontEnd" en formato "JSON".
        res.json({token, user});
    } catch (e) {
        //En caso de error.
        handleHttpError(res, "ERROR_LOGIN_USER", 403);
    }


}


//Controlador necesario de comprobar el email y además de enviar un correo con el "PIN".
const forgotPasswordCtrl = async (req, res) => {
    //try/catch por si hay algún error.
    try {
        //obtenemos los datos que ha introducido el usuario en el formulario.
        const {email} = req.body;

        //Buscamos si existe el usuario con ese en la base de datos
        const user = await userModel.findOne({email});
        //Si no existe el usuario retornamos un error.
        if (!user) return handleHttpError(res, 'EMAIL_NOT_FOUND', 404);

        //Creamos el token(lo llamaremos "PIN" porque es un número muy corto para que el usuario lo pueda memorizar).
        //Y lo metemos en la base de datos.
        const resetToken = resetPasswordToken(user);
        //Guardamos todos los cambios en la base de datos.
        await user.save();

        //Creamos el mensaje que enviaremos
        const message = `
        <h1>Tu tienes un nuevo restablecimiento de contraseña</h1>
        <h3>Por favor ingrese este PIN para crear una contraseña nueva: </h3>
        <h3 style="margin-left: 127px">PIN: ${resetToken}</h3>`

        try {
            //Enviamos el email al cliente
            await sendEmail({
                to: user.email,
                subject: "Restablecer contraseña",
                text: message,
            });

            //Lo enviamos al "frontEnd"
            res.send(user);

            //En caso de error
        } catch (e) {
            //En caso de error ponemos los campos en null para que el usuario pueda volver a restablecer la contraseña
            user.tokenConfirm = null;
            user.resetTokenExpire = null;

            //Lo enviamos al "FrontEnd"
            await user.save();

            //En caso de error
            return handleHttpError(res, "EMAIL_NOT_SENT", 404);

        }

    } catch (e) {
        //En caso de error.
        handleHttpError(res, e.message.toUpperCase(), 403);
    }
};


//Controlador que valida el "PIN" del usuario con el "PIN" de la base de datos.
const checkPin = async (req, res) => {
    //try/catch por si hay algún error.
    try {
        //obtenemos los datos que ha introducido el usuario en el formulario.
        const {pin, email} = req.body;

        //Buscamos si existe el usuario con ese en la base de datos
        const user = await userModel.findOne({email});
        //Si no existe el usuario retornamos un error.
        if (!user) return handleHttpError(res, 'EMAIL_NOT_FOUND', 404);

        //Convertimos el "PIN" en "sha256"
        const tokenConfirm = crypto.createHash("sha256").update(pin).digest("hex");
        //Lo comparamos con la base de datos. Si no es correcto retornamos un error.
        if (tokenConfirm !== user.tokenConfirm) return handleHttpError(res, 'PIN_INVALID', 404);

        //Buscamos el token en la base de datos y además si es mayor($gt) que el tiempo ingresado en la base de datos entonces ha expirado.
        //Recordamos que en la base de datos lo hemos introducido con 10 min de adelanto así que si  "ahora" > "10 + antes" significa que ha pasado 10 min.
        const expirePin = await userModel.findOne({tokenConfirm, resetTokenExpire: {$gt: moment().format('hh:mm')}});

        //Sino lo encuentra en la base de datos lo reseteamos y retornamos un error.
        if (!expirePin) {
            user.tokenConfirm = null;
            user.resetTokenExpire = null;
            return handleHttpError(res, 'PIN_EXPIRED', 400);
        }
        //Lo enviamos al "FrontEnd"
        res.send();
    } catch (e) {
        //En caso de error.
        return handleHttpError(res, "ERROR_CHECK_PIN", 404)
    }
}

//Controlador cuya función es modificar la contraseña en la base de datos.
const resetPasswordCtrl = async (req, res) => {
    //try/catch por si hay algún error.
    try {
        //obtenemos los datos que ha introducido el usuario en el formulario.
        const {password, email} = req.body;

        //Buscamos si existe el usuario con ese en la base de datos
        const user = await userModel.findOne({email});
        //Encriptamos la contraseña
        user.password = await encrypt(password);
        //Modificamos "tokenConfirm"
        user.tokenConfirm = null;
        //Modificamos "resetTokenExpire"
        user.resetTokenExpire = null;
        //Guardamos todos los cambios en la base de datos
        await user.save();
        //Lo enviamos al "FrontEnd"
        res.send();
    } catch (e) {
        //En caso de error.
        return handleHttpError(res, "ERROR_RESET_PASSWORD", 404)
    }

}


// Exportar los módulos
module.exports = {
    registerCtrl,
    loginCtrl,
    accountAceptedCtrl,
    forgotPasswordCtrl,
    resetPasswordCtrl,
    checkPin
};

