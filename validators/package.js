const {check} = require('express-validator');
const validateResults = require('../utils/handleValidator');

const validatorRegister = [
    check("url").exists().notEmpty(),
    check("filename").exists().notEmpty(),
    check("title").exists().notEmpty(),
    check("description").exists().notEmpty(),
    check("type").exists().notEmpty(),
    (req, res, next) => {
        return validateResults(req, res, next);
    }
];


const validatorGetItem = [
    check("id").exists().notEmpty().isMongoId(),
    (req, res, next) => {
        return validateResults(req, res, next);
    }
];

module.exports = {validatorRegister, validatorGetItem};