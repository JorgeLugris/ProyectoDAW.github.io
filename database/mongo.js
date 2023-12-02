const mongoose = require('mongoose');

const dbConnect = () => {
    mongoose.connect(process.env.DB_URI)
        .then(() => console.log("** CONEXIÓN CORRECTA **".green))
        .catch((e) => console.log("** ERROR DE CONEXIÓN **".red, e));
};

module.exports = dbConnect;
