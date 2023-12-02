const fs = require('fs');

const {storageModel} = require('../models');
const {handleHttpError} = require("../utils/handleError");
const {matchedData} = require("express-validator");

const PUBLIC_URL = "http://localhost:5000" || null;
const MEDIA_PATH = `${__dirname}/../storage`;

//Obtener lista de usuarios
const getItems = async (req, res) => {
    try {
        const data = await storageModel.find({});
        res.send({data});
    } catch (e) {
        handleHttpError(res, "ERROR_GET_ITEMS", 403);
    }
}

//Obtener un solo usuario
const getItem = async (req, res) => {
    try {
        const {id} = matchedData(req);
        const data = await storageModel.findById(id);
        res.send({data});
    } catch (e) {
        handleHttpError(res, "ERROR_GET_ITEM", 403);
    }
}

//Insertar un usuario
const createItem = async (req, res) => {
    try {
        const {file} = req;
        const fileData = {
            filename: file.filename,
            url: `http://localhost:5000/${file.filename}`,
        }
        const data = await storageModel.create(fileData)
        res.send({data});
    } catch (e) {
        handleHttpError(res, "ERROR_CREATE_ITEM", 403);
    }
}

//Actualizar un usuario
const updateItem = async (req, res) => {
    try {
        const { id } = matchedData(req);
        const { name, email } = req.body;

        // Verificar si el usuario existe antes de actualizarlo
        const user = await storageModel.findById(id);
        if (!user) {
            return handleHttpError(res, "ERROR_UPDATE_ITEM", 404);
        }

        // Actualizar los campos (nombre y correo electrónico)
        user.name = name;
        user.email = email;
        await user.save();

        res.send({ data: user });
    } catch (e) {
        handleHttpError(res, "ERROR_UPDATE_ITEM", 403);
    }
}

//Borrar un usuario
const deleteItem = async (req, res) => {
    try {
        const {id} = matchedData(req);
        const dataFile = await storageModel.findById(id);
        await storageModel.delete({_id: id});
        const {filename} = dataFile;
        const filePath = `${MEDIA_PATH}/${filename}`; //TODO C:/miproyecto/file-q232.png
        fs.unlinkSync(filePath);
        const data = {
            filePath,
            deleted: 1
        }
        res.send({data});
    } catch (e) {
        handleHttpError(res, "ERROR_DELETE_ITEM", 403);
    }
}

module.exports = {getItems, getItem, createItem, updateItem, deleteItem};