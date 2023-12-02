// Importar librerías
const {validationResult} = require('express-validator');
const {handleHttpError} = require("./handleError");

// Middleware que valida los campos de la base de datos.
const validateResults = (req, res, next) => {
    try {
        validationResult(req).throw();
        return next();
    } catch (err) {
        if (!(req.body.username || req.body.email || req.body.password)) {
            return handleHttpError(res, "EMPTY_FIELDS", 403);
        } else {
            return handleHttpError(res, "ERROR_REGISTER", 403);
        }
    }
};

//Exportamos los módulos
module.exports = validateResults;