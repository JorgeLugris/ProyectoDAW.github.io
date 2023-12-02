// Utilizamos multer para subir los archivos
const multer = require("multer");

const storage = multer.diskStorage({
    //Definimos la ruta del archivo
    destination: function (req, file, cb) {
        const pathStorage = `${__dirname}/../storage`;
        cb(null, pathStorage)
    },
    filename: function (req, file, cb) {

        //TODO: mi-cv.pdf mi-foto.png mi-video.mp4
        //Genera un nombre aleatorio al archivo para que no se repita y no se sobreescriba.
        const ext = file.originalname.split('.').pop(); //TODO ["png","img"]

        const filename = `file-${Date.now()}.${ext}` //TODO file-1234455.png
        cb(null, filename);
    },
});

//Middleware
const uploadMiddleware = multer({storage});

module.exports = uploadMiddleware;