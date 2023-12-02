// Importar librerías
const mongoose = require('mongoose');
const mongooseDelete = require("mongoose-delete");

//Esquema de la base de datos del modelo "reserve"
const reserveSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Types.ObjectId
        },
        monitor:{
            type: String,
        },
        compra:{
            type: Date,
        }
    },
    {
        timestamps: true,
        versionKey: false
    }
);
reserveSchema.plugin(mongooseDelete, {overrideMethods: 'all'});
//Creamos el modelo.
module.exports = mongoose.model("reserves", reserveSchema);