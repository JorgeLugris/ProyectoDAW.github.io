//TODO http://localhost:3000/api/

// Importar todas las librerías
const express = require('express');
const {sendNewsletter} = require("../controllers/newsletter");
const router = express.Router();


// Envía un newsletter
router.post('/', sendNewsletter);

// Exportamos las rutas
module.exports = router;