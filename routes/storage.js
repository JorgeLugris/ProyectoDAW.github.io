//TODO http://localhost:3000/storage

// Importar todas las librerías
const express = require('express');
const router = express.Router();
const uploadMiddleware = require('../utils/handleStorage');
const {createItem} = require("../controllers/storage");
const {getItems, getItem, updateItem, deleteItem} = require("../controllers/storage");
const {validatorGetItem} = require("../validators/user");

// Lista los items
router.get('/', getItems);

// Obtener un detalle
router.get("/:id", validatorGetItem, getItem);

// Crear un registro
router.post('/', uploadMiddleware.single("myfile"), createItem);

// Actualizar un Registro
router.put('/:id', validatorGetItem, updateItem);

// Eliminar un registro
router.delete('/:id', validatorGetItem, deleteItem);


module.exports = router;