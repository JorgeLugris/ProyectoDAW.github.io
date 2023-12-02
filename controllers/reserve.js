const {reserveModel} = require('../models');
const {handleHttpError} = require("../utils/handleError");
const mongoose = require("mongoose");
const moment = require("moment");

const PUBLIC_URL = process.env.PUBLIC_URL || null;
const MEDIA_PATH = `${__dirname}/../storage`;


//Obtener todas las reservas
const getReserves = async (req, res) => {
    try {
        let reservas = await reserveModel.find({});


        const usuarios = await reserveModel.aggregate([

                // Join with user_info table
                {
                    $lookup: {
                        from: "users",
                        localField: "user",
                        foreignField: "_id",
                        as: "userReserve"
                    }
                },
                // $unwind used for getting data in object or for one record only

                // Join with user_role table
                {
                    $lookup: {
                        from: "monitors",
                        localField: "monitor",
                        foreignField: "specialty",
                        as: "monitor_type"
                    }
                },
                {
                    $project: {
                        _id: 1,
                        user: "$userReserve.username",
                        monitor: "$monitor_type",
                        compra: 1,
                    }
                }

                // define which fields are you want to fetch

            ]
        )
        return res.json(usuarios);
    } catch (e) {
        handleHttpError(res, "ERROR_GET_ITEMS", 403);
    }
}

//Crear reservas
const createReserve = async (req, res) => {

    const hoy = moment(new Date()).format("YYYY-MM-DD");

    try {
        await reserveModel.create({
            user: mongoose.Types.ObjectId(req.body.user),
            monitor: req.body.type,
            compra: hoy
        });

        res.send("Reserva satisfactoria");
    } catch (e) {
        handleHttpError(res, "ERROR_CREATE_ITEM", 403);
    }

}

const deleteReserve = async (req, res) => {
    try {
        const {id} = req.params
        const dataFile = await reserveModel.findById(id);
        await reserveModel.deleteOne({_id: id});
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

const updateReserve = async (req, res) => {
    try {
        const {id} = req.body;
        const {date} = req.body.reserve;
        const {type} = req.body.reserve;

        await reserveModel.findByIdAndUpdate(id, {compra: date, monitor: type});
        res.send("Se ha actualizado correctamente");
    } catch (e) {
        handleHttpError(res, "ERROR_CREATE_ITEM", 403);
    }

}

module.exports = {getReserves, createReserve, deleteReserve, updateReserve};