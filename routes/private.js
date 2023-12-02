// Importar librerías
const express = require('express');
const {authMiddleware} = require("../middleware/session");
const checkRol = require("../middleware/rol");
const router = express.Router();

router.get('/', authMiddleware, checkRol(["ADMIN"]),
    (req, res) => {
        res.render('private');
});

module.exports = router;