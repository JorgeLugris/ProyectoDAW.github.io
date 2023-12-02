//Insertar un usuario
const {blogModel, monitorModel} = require("../models");
const {handleHttpError} = require("../utils/handleError");
const {matchedData} = require("express-validator");
const mongoose = require("mongoose");

const PUBLIC_URL = process.env.PUBLIC_URL || null;
const MEDIA_PATH = `${__dirname}/../storage`;

//Obtener lista de usuarios
const getBlogs = async (req, res) => {
    try {
        const data = await blogModel.find({user: req.params.username});
        res.send(data);
    } catch (e) {
        handleHttpError(res, "ERROR_GET_ITEMS", 403);
    }
}

//Obtener un solo usuario
const getBlog = async (req, res) => {
    try {
        //const {id} = matchedData(req);
        const {id} = req.params
        const data = await blogModel.findById({_id: id});

        res.send(data);
    } catch (e) {
        handleHttpError(res, "ERROR_GET_ITEM", 403);
    }
}

//Obtener un solo usuario
const getAllBlogs = async (req, res) => {
    try {
        //const {id} = matchedData(req);
        const data = await blogModel.find({});

        res.send(data);
    } catch (e) {
        handleHttpError(res, "ERROR_GET_ITEM", 403);
    }
}

const createBlog = async (req, res) => {
    try {
        const {file} = req;
        const fileData = {
            title: req.body.title,
            description: req.body.description,
            filename: file.filename,
            url: `${PUBLIC_URL}/${file.filename}`,
            user: req.body.user,
        }
        const data = await blogModel.create(fileData);
        res.send(data);
    } catch (e) {
        handleHttpError(res, "ERROR_CREATE_ITEM", 403);
    }
}

//Borrar un usuario
const deleteBlog = async (req, res) => {
    try {
        const {id} = matchedData(req);
        const dataFile = await blogModel.findById(id);
        await blogModel.deleteOne({_id: id});
        const {filename} = dataFile;
        const filePath = `${MEDIA_PATH}/${filename}`; //TODO C:/miproyecto/file-q232.png
        //fs.unlinkSync(filePath);
        const data = {
            filePath,
            deleted: 1
        }
        res.send("Se ha borrado correctamente");
    } catch (e) {
        handleHttpError(res, "ERROR_DELETE_ITEM", 403);
    }
}

//Actualizar un usuario
const updateBlog = async (req, res) => {
    const {file} = req;
    const id = req.body.id;
    if (file !== undefined) {
        const fileData = {
            filename: file.filename,
            url: `${PUBLIC_URL}/${file.filename}`,
            title: req.body.title,
            description: req.body.description
        }
        const dataI = await blogModel.findOneAndUpdate({_id: id}, fileData)
        res.send(dataI);
    } else {
        const fileData = {
            filename: undefined,
            url: undefined,
            title: req.body.title,
            description: req.body.description
        }
        const dataN = await blogModel.findOneAndUpdate({_id: id}, fileData);
        res.send(dataN);
    }

}

module.exports = {getBlogs, getBlog, createBlog, deleteBlog, getAllBlogs, updateBlog};