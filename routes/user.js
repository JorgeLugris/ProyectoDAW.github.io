const express = require('express');
const router = express.Router();
const {validatorCreateItem, validatorGetItem} = require('../validators/user');
const {getItems, getItem, createItem, updateItem, deleteItem} = require('../controllers/user');
const {authMiddleware} = require("../middleware/session");
const checkRol = require("../middleware/rol");
const User = require('../models/user');
const uploadMiddleware = require("../utils/handleStorage");

// Lista los items
router.get('/', getItems, authMiddleware, checkRol(['ADMIN']));

router.get('/', async (req, res) => {
    const users = await User.find();
    try {
        return res.status(200).json(users)
    } catch (error) {
        return res.status(500).json({message: "Couldn't get books"});
    }
});

// Obtener un detalle
router.get("/:id", validatorGetItem, getItem);

// Crear un registro
router.post('/', validatorCreateItem, createItem);

// Actualizar un Registro
router.put('/update/:id',  uploadMiddleware.single("image"), updateItem);

// Eliminar un registro
router.delete('/delete/:id', deleteItem);

module.exports = router;


