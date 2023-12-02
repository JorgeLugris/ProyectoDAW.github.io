const {packageModel, monitorModel, reserveModel} = require("../models");

const {handleHttpError} = require("../utils/handleError");
const {matchedData} = require("express-validator");

const PUBLIC_URL = process.env.PUBLIC_URL || null;
const MEDIA_PATH = `${__dirname}/../storage`;


const createPackage = async (req, res) => {
    const {file} = req;
    try {
        const fileData = {
            filename: file.filename,
            url: `${PUBLIC_URL}/${file.filename}`,
            title: req.body.title,
            type: req.body.type,
            description: req.body.description
        }
        const data = await packageModel.create(fileData)
        res.send(data);
    } catch (e) {
        handleHttpError(res, "ERROR_CREATE_ITEM", 403);
    }
}


//Obtener lista de usuarios
const getPackages = async (req, res) => {

    try {
        const data = await packageModel.find({});
        return res.json(data);
    } catch (e) {
        handleHttpError(res, "ERROR_GET_ITEMS", 403);
    }
}

//Obtener un solo paquete
const getPackage = async (req, res) => {

    try {
        const {id} = matchedData(req);
        const data = await packageModel.findById(id);
        res.send(data);
    } catch (e) {
        handleHttpError(res, "ERROR_GET_ITEM", 403);
    }
}

//Eliminar un paquete
const deletePackage = async (req, res) => {
    try {
        const {id} = matchedData(req);
        const dataFile = await packageModel.findById(id);
        await packageModel.deleteOne({_id: id});
        const {filename} = dataFile;
        const filePath = `${MEDIA_PATH}/${filename}`; //TODO C:/miproyecto/file-q232.png
        //fs.unlinkSync(filePath);
        const data = {
            filePath,
            deleted: 1
        }
        res.send(data);
    } catch (e) {
        handleHttpError(res, "ERROR_DELETE_ITEM", 403);
    }
}

//Actualizar un usuario
const updatePackage = async (req, res) => {
    const {file} = req;
    const id = req.body.id;
    if (file !== undefined) {
        const fileData = {
            filename: file.filename,
            url: `${PUBLIC_URL}/${file.filename}`,
            title: req.body.title,
            type: req.body.type,
            description: req.body.description

        }
        const dataI = await packageModel.findByIdAndUpdate(id, fileData)
        res.send(dataI);
    } else {
        const fileData = {
            filename: undefined,
            url: undefined,
            title: req.body.title,
            type: req.body.type,
            description: req.body.description
        }
        const dataN = await packageModel.findByIdAndUpdate(id, fileData);
        res.send(dataN);
    }

}

//Obtener lista de usuarios
const pruebaPackage = async (req, res) => {
    try {
        const usuarios = await packageModel.aggregate(
            [{
                $lookup: {
                    from: "monitors",
                    localField: "type",
                    foreignField: "specialty",
                    as: "monitorReserve"
                }
            },

            ]
        )

        return res.json(usuarios);
    } catch (e) {
        handleHttpError(res, "ERROR_GET_ITEMS", 403);
    }
}


module.exports = {createPackage, getPackages, deletePackage, getPackage, updatePackage, pruebaPackage};
