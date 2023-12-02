//TODO http://localhost:3000/package

// Importar todas las librerías
const express = require('express');
const {createHelp, getHelps, changeHelp, messageHelp, respuestaHelp, deleteHelp} = require("../controllers/help");
const router = express.Router();


// Crear un paquete
//TODO http://localhost:3000/help/create
router.post('/create',  createHelp);
router.get('/', getHelps);
router.post('/change', changeHelp);
router.post('/message', messageHelp);
router.post('/respuesta', respuestaHelp);
router.delete('/delete/:id', deleteHelp)



// Exportamos las rutas
module.exports = router;