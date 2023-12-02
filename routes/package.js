//TODO http://localhost:3000/package
// Importar todas las librerías
const express = require('express');
const router = express.Router();
const uploadMiddleware = require('../utils/handleStorage');
const {
    createPackage,
    getPackages,
    deletePackage,
    getPackage,
    updatePackage,
} = require("../controllers/package");
const {validatorRegister, validatorGetItem} = require("../validators/package");

// Crear un paquete
//TODO http://localhost:3000/package/create
router.post('/create', uploadMiddleware.single("image"), createPackage);

// Obtener todos los paquetes
//TODO http://localhost:3000/package
router.get('/', getPackages);

// Obtener solo un paquete
//TODO http://localhost:3000/package/:id
router.get('/:id', validatorGetItem, getPackage);

// Actualizar un paquete
//TODO http://localhost:3000/package/update
router.put('/update', uploadMiddleware.single("image"), updatePackage);

// Eliminar paquete
//TODO http://localhost:3000/package/delete/:id
router.delete('/delete/:id', validatorGetItem, deletePackage);


// Exportamos las rutas
module.exports = router;