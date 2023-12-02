// Importar librerías
const mongoose = require('mongoose');
const mongooseDelete = require("mongoose-delete");

//Esquema de la base de datos del modelo "reserve"
const helpSchema = new mongoose.Schema(
    {
        username: {
            type: String
        },
        email:{
            type: String
        },
        message:{
            type: String
        },
        nuevo: {
            type: Boolean,
            default: true
        },
        respuesta:{
            type: String,
            default: "No"
        }
    },
    {
        timestamps: true,
        versionKey: false
    }
);
helpSchema.plugin(mongooseDelete, {overrideMethods: 'all'});
//Creamos el modelo.
module.exports = mongoose.model("helps", helpSchema);