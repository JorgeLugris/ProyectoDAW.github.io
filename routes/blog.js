// Crear un registro
const express = require('express');
const router = express.Router();

const uploadMiddleware = require("../utils/handleStorage");
const {getBlogs,createBlog,deleteBlog, getBlog, updateBlog, getAllBlogs} = require("../controllers/blog");
const {validatorGetItem} = require("../validators/user");



// Lista los items
router.get('/:username', getBlogs);
router.get('/id/:id', getBlog);

router.get('/', getAllBlogs);
router.post('/create', uploadMiddleware.single("image"), createBlog);
// Eliminar un registro
router.delete('/delete/:id', validatorGetItem, deleteBlog);

// Actualizar un Registro
router.put('/update', uploadMiddleware.single("image"), updateBlog);

module.exports = router;