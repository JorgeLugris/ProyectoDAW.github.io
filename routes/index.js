// Importar librerías
const express = require('express');
const fs = require('fs');
const router = express.Router();

//Ruta actual.
const PATH_ROUTES = __dirname;

//Direccionamiento que he creado para que se envíe a las rutas correspondientes.

//Elimina la extensión.
const removeExtension = (fileName) => {
    //TODO user.js [user, js]
    return fileName.split('.').shift();
}

//Obtiene el nombre de la ruta.
fs.readdirSync(PATH_ROUTES).filter((file) => {
    const name = removeExtension(file) //TODO users, storage, tracks
    if (name !== 'index') router.use(`/${name}`, require(`./${file}`));
});

//Exporta el módulo.
module.exports = router;