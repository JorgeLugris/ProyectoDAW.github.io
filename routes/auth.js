// Importar librerías
const express = require('express');
const router = express.Router();

// Importar módulos de Node.js
const {validatorRegister, validatorLogin, validatorPassword} = require("../validators/auth");
const {
    loginCtrl,
    registerCtrl,
    accountAceptedCtrl,
    forgotPasswordCtrl, resetPasswordCtrl, checkPin
} = require("../controllers/auth");
const {authMiddleware} = require("../middleware/session");
const checkRol = require("../middleware/rol");
const uploadMiddleware = require("../utils/handleStorage");
const {validatorCreateItem} = require("../validators/user");


// Ruta para registrarse:
// TODO http://localhost:3000/api/auth/register
//router.get('/register', registerForm);
router.post('/register',uploadMiddleware.single("image"), validatorRegister, registerCtrl);


// Ruta para iniciar sesión:
// TODO http://localhost:3000/api/auth/login
//router.get('/login', loginForm);
router.post('/login', validatorLogin, loginCtrl);


//Ruta de confirmación de cuenta:
// TODO http://localhost:3000/api/auth//account/:id
router.get('/account/:token', accountAceptedCtrl);

//Ruta de contraseña olvidada:
// TODO http://localhost:3000/api/auth//Password
//router.get('/password', forgotPassword);
router.post('/forgotPassword', forgotPasswordCtrl);

//Ruta para comparar el "PIN" que ha introducido el usuario con el de la base de datos.
// TODO http://localhost:3000/api/auth/checkPin
router.post('/checkPin', checkPin);

//Crea y guarda la nueva contraseña.
// TODO http://localhost:3000/api/auth/resetPassword
router.post('/resetPasswordCtrl', validatorPassword, resetPasswordCtrl);


// Exportar los módulos
module.exports = router;


