// Importar módulos de Node.js
const {handleHttpError} = require('../utils/handleError');
const {verifyToken} = require("../utils/handleToken");
const {usersModel} = require('../models');

//Comprueba las sesiones de un usuario.
//Se ha utilizado el método de "JWT".
//Cuya función es saber si el usuario ha iniciado sesión y que páginas pueden aparecer y que páginas no.
const authMiddleware = async (req, res, next) => {
    try {
        if (!req.headers.authorization || !req.headers.authorization.startsWith("Bearer")) return handleHttpError(res, "NOT_TOKEN", 401);

        const token = req.headers.authorization.split(' ').pop();
        const dataToken = await verifyToken(token);

        if (!dataToken) return  handleHttpError(res, "AUTHORIZATION_ERROR", 401);

        const user = await usersModel.findById({_id: dataToken._id});
        console.log(user);


        if (!user) return handleHttpError(res, "NOT_FOUND_USER", 404);

        req.user = user;

        next();

    } catch (e) {
        handleHttpError(res, "NOT_SESSION", 401);
    }
};
module.exports = {authMiddleware};