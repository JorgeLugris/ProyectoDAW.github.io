//Importar librerías
const bcrypt = require('bcrypt');

//Encripta la contraseña
const encrypt = async (passwordPlain) => {
    return await bcrypt.hash(passwordPlain, 10);
}

//Comparar las contraseñas
//Pasar contraseña sin encriptar y pasar contraseña encriptada.
const compare = async (passwordPlain, hashPassword) => {
    return await bcrypt.compare(passwordPlain, hashPassword);
}

//Exporta los módulos
module.exports = {encrypt, compare};