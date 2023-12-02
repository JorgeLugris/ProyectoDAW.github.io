// Importar módulos de Node.js
const {handleHttpError} = require("../utils/handleError");

//Función que comprueba los "roles"(Para saber quien tiene acceso a las páginas).
const checkRol = (roles) => (req, res, next) => {
    try {
        const user = req.user;
        const rolesByUser = user.role;

        const checkValueRol = roles.some((rolSingle) => rolesByUser.includes(rolSingle));
        if (!checkValueRol) return handleHttpError(res, "USER_NOT_PERMISSION", 403);
        next();

    } catch (e) {
        handleHttpError(res, 'ERROR_PERMISSIONS', 403);
    }
}

module.exports = checkRol;