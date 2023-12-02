const fs = require('fs');

const {monitorModel} = require('../models');
const {handleHttpError} = require("../utils/handleError");

const PUBLIC_URL = process.env.PUBLIC_URL || null;
const MEDIA_PATH = `${__dirname}/../storage`;

//Obtener lista de usuarios
const getItems = async (req, res) => {
    try {
        const data = await monitorModel.find({});
        return res.json(data);
    } catch (e) {
        handleHttpError(res, "ERROR_GET_ITEMS", 403);
    }
}

//Obtener un solo usuario
const getItem = async (req, res) => {
    try {
        const {id} = req.params;
        console.log(id);
        const data = await monitorModel.findById(id);
        res.send(data);
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
            url: `${PUBLIC_URL}/${file.filename}`,
            name: req.body.name,
            specialty: req.body.specialty
        }
        const data = await monitorModel.create(fileData)
        res.send(data);
    } catch (e) {
        handleHttpError(res, "ERROR_CREATE_ITEM", 403);
    }
}

//Actualizar un usuario
const updateItem = async (req, res) => {
    const {file} = req;
    const id = req.body.id;
    if (file !== undefined) {
        const fileData = {
            filename: file.filename,
            url: `${PUBLIC_URL}/${file.filename}`,
            name: req.body.name,
            specialty: req.body.specialty
        }
        const dataI= await monitorModel.findByIdAndUpdate(id, fileData)
        res.send(dataI);
    } else {
        const fileData = {
            filename: undefined,
            url: undefined,
            name: req.body.name,
            specialty: req.body.specialty
        }
        const dataN = await monitorModel.findByIdAndUpdate(id, fileData);
        res.send(dataN);
    }

}

//Borrar un usuario
const deleteItem = async (req, res) => {
    try {
        const {id} = req.params
        const dataFile = await monitorModel.findById(id);
        await monitorModel.deleteOne({_id: id});
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