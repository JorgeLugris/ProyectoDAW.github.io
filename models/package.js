// Importar librerías
const mongoose = require('mongoose');
const mongooseDelete = require("mongoose-delete");

//Esquema de la base de datos del modelo "paquete"
const packageSchema = new mongoose.Schema(
    {
        url: {
            type: String,
        },

        filename: {
            type: String,
        },
        title: {
            type: String,
        },
        description: {
            type: String,
        },
        type:{
            type: String,
        }
    },
    {
        timestamps: true,
        versionKey: false
    }
);
packageSchema.plugin(mongooseDelete, {overrideMethods: 'all'});
//Creamos el modelo.
module.exports = mongoose.model("packages", packageSchema);