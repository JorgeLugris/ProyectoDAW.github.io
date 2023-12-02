const {usersModel, monitorModel} = require('../models');
const {matchedData} = require('express-validator');
const {handleHttpError} = require("../utils/handleError");
const {encrypt} = require("../utils/handlePassword");


const PUBLIC_URL = process.env.PUBLIC_URL || null;
const MEDIA_PATH = `${__dirname}/../storage`;

//Obtener lista de usuarios
const getItems = async (req, res) => {
    try {
        //const user = req.user;
        const data = await usersModel.find({});
        return res.status(200).json(data);
    } catch (e) {
        handleHttpError(res, 'ERROR_GET_ITEMS', 403)
    }
}

//Obtener un solo usuario
const getItem = async (req, res) => {
    try {
        req = matchedData(req)
        const {id} = req;
        const data = await usersModel.findById(id);
        res.send(data);
    } catch (e) {
        handleHttpError(res, 'ERROR_GET_ITEMS', 403)
    }
}

//Insertar un usuario
const createItem = async (req, res) => {
    try {

        const body = matchedData(req);

        const data = await usersModel.create(body);
        res.send(data);
    } catch (e) {
        console.log(e);
        handleHttpError(res, 'ERROR_CREATE_ITEMS', 403)
    }
}

//Actualizar un usuario
const updateItem = async (req, res) => {

    try {
        const {file} = req;
        const id = req.body.id;
        let role;

        if (req.body.role !== undefined) {
            role = req.body.role.toUpperCase();

            role = (role === "USER" || role === "ADMIN") ? role : "USER";
        } else {
            role = undefined;
        }

        console.log(role);

        if (file !== undefined) {
            const fileData = {
                filename: file.filename,
                url: `${PUBLIC_URL}/${file.filename}`,
                username: req.body.username,
                date: req.body.date,
                email: req.body.email,
                phone: req.body.phone,
                role: role
            }
            console.log("Hola");
            const dataI = await usersModel.findByIdAndUpdate(id, fileData)
            res.send(dataI);
        } else {
            const fileData = {
                filename: undefined,
                url: undefined,
                username: req.body.username,
                date: req.body.date,
                email: req.body.email,
                phone: req.body.phone,
                role: role
            }

            const dataN = await usersModel.findByIdAndUpdate(id, fileData);
            res.send(dataN);
        }


    } catch (e) {
        handleHttpError(res, 'ERROR_Update_ITEMS', 403)
    }
}

//Borrar un usuario
const deleteItem = async (req, res) => {
    try {
        const {id} = req.params
        const data = await usersModel.deleteOne({_id: id});
        res.send({data});
    } catch (e) {
        handleHttpError(res, 'ERROR_DELETE_ITEMS', 403)
    }
}

module.exports = {getItems, getItem, createItem, updateItem, deleteItem}
