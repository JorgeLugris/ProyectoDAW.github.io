//TODO http://localhost:3000/package

// Importar todas las librerías
const express = require('express');
const router = express.Router();
const {getReserves, createReserve, deleteReserve, updateReserve} = require("../controllers/reserve");


// Obtener todas las reservas
router.get('/',  getReserves);

router.post('/create', createReserve);

router.delete('/delete/:id', deleteReserve);

router.put('/update', updateReserve);


module.exports = router;