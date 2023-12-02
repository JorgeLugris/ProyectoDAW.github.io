// Importar librerías
const mongoose = require('mongoose');
const mongooseDelete = require('mongoose-delete');

//Esquema de la base de datos del modelo "usuario".
const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            lowercase: true,
            required: [true],
            trim: true
        },

        email: {
            type: String,
            lowercase: true,
            required: true,
            trim: true,
        },
        password: {
            type: String,
            required: true,
        },
        url: {
            type: String,
        },

        filename: {
            type: String,
        },

        date: {
            type: Date,
            required: true,
        },

        phone: {
            type: Number,
            required: true
        },

        cuentaConfirmada: {
            type: Boolean,
            default: false,
        },

        tokenConfirm: {
            type: String,
            default: null,
        },
        resetTokenExpire:{
            type: String,
            default: null,
        } ,
        role: {
            type: String,
            required: true,
            enum: ["USER", "ADMIN"],
            default: "USER"
        },
    },
    {
        timestamps: true,
        versionKey: false
    }
);

userSchema.plugin(mongooseDelete, {overrideMethods: 'all'});
//Creamos el modelo.
module.exports = mongoose.model("users", userSchema);