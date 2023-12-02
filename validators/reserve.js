const {check} = require('express-validator');
const validateResults = require('../utils/handleValidator');

const validatorRegisterReserve = [
    check("user").exists().notEmpty(),
    check("monitor").exists().notEmpty(),
    (req, res, next) => {
        return validateResults(req, res, next);
    }
];


const validatorGetReserve = [
    check("id").exists().notEmpty().isMongoId(),
    (req, res, next) => {
        return validateResults(req, res, next);
    }
];

module.exports = {validatorRegisterReserve, validatorGetReserve};