// Configuración de Variables de entorno
require('dotenv').config();

// Colores para la consola
require('colors');

// Importar todas las librerías
const express = require('express');
const cors = require('cors');


// Importar módulos de Node.js
const connectDB = require('./config/database');
const slackBot = require("./utils/handleSlack");
const {create} = require("express-handlebars");
const path = require("path");


// Conexión a la base de datos
connectDB();


// Uso de métodos de las librerías
const app = express();

// Bot de "Slack (Un Bot que envía en un canal los errores que pueda contener el servidor)"
slackBot(app);

// Conjunto middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// Conjunto de rutas
app.use("/api", require('./routes'));
app.use(express.static('storage'));
app.use(express.static(__dirname + '/public'));


if (process.env.NODE_ENV === "production") {

    app.use(express.static(path.join(__dirname, "/frontend/build")));


    app.get("*", (req, res) => {

        res.sendFile(path.join(__dirname, 'frontend', 'build', 'index.html'));

    })
} else {
    app.get("/", (req, res) => {
        res.send("Api running");
    })
}



//  Escuchar al puerto
const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`El servidor esta corriendo en el puerto ${port}...`.green)
});


/*
app.use(cors());

* */

