//TODO http://localhost:3000/storage

// Importar todas las librerías
const express = require('express');
const router = express.Router();
const uploadMiddleware = require('../utils/handleStorage');
const {createItem} = require("../controllers/monitor");
const {getItems, getItem, updateItem, deleteItem} = require("../controllers/monitor");

// Lista los items
router.get('/', getItems);

// Obtener un detalle
router.get("/:id", getItem);

// Crear un registro
router.post('/upload', uploadMiddleware.single("image"), createItem);

// Actualizar un Registro
router.put('/update', uploadMiddleware.single("image"), updateItem);

// Eliminar un registro
router.delete('/delete/:id', deleteItem);


module.exports = router;