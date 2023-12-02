//Insertar un usuario
const {helpModel} = require("../models");
const {handleHttpError} = require("../utils/handleError");
const sendEmail = require("../utils/sendEmail");


const createHelp = async (req, res) => {
    try {
        const data = await helpModel.create(req.body)
        res.send(data);
    } catch (e) {
        handleHttpError(res, "ERROR_CREATE_ITEM", 403);
    }
}

//Obtener lista de usuarios
const getHelps = async (req, res) => {
    try {
        const data = await helpModel.find({});
        res.send(data);
    } catch (e) {
        handleHttpError(res, "ERROR_GET_ITEMS", 403);
    }
}


const changeHelp = async (req, res) => {
    try {
        const data = await helpModel.updateMany({nuevo: true}, {nuevo: false});
        res.send(data);
    } catch (e) {
        handleHttpError(res, "ERROR_GET_ITEMS", 403);
    }
}

const messageHelp = async (req, res) => {
    try {
        const {title, message} = req.body.message;
        const {email} = req.body;


        const mensaje = `
        <h1>${title}</h1>
        <p><b><i>${message}</i><b></p>
      `

        //Enviamos el mensaje.
        await sendEmail({
            to: email,
            subject: "Respuesta al mensaje de soporte de ayuda",
            text: mensaje,
        });
        res.send("Mensaje enviado");


    } catch (e) {
        handleHttpError(res, "ERROR_GET_ITEMS", 403);
    }
}


const respuestaHelp = async (req, res) => {
    try {
        const {id} = req.body;
        await helpModel.findByIdAndUpdate(id, {respuesta: "Si"});
        res.send("todo bien");

    } catch (e) {
        handleHttpError(res, "ERROR_GET_ITEMS", 403);
    }
}

const deleteHelp = async (req, res) => {
    try {
        const {id} = req.params;
        const deleteData = await helpModel.deleteOne({_id: id});
        res.send(deleteData);

    } catch (e) {
        handleHttpError(res, "ERROR_GET_ITEMS", 403);
    }
}


module.exports = {createHelp, getHelps, changeHelp, messageHelp, respuestaHelp, deleteHelp};