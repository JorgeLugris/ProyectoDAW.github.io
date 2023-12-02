const {check} = require('express-validator');
const validateResults = require('../utils/handleValidator');

const validatorRegister = [
    check("username").exists().notEmpty().isLength({min: 3, max: 10}),
    check("email").exists().notEmpty().isEmail(),
    check("password").exists().notEmpty().isLength({min: 5, max: 15}),
    check("date").exists().notEmpty().isDate(),
    check("phone").exists().notEmpty(),
    check("role"),
    check("tokenConfirm"),
    check("resetTokenExpire"),
    (req, res, next) => {
        return validateResults(req, res, next);
    }
];

const validatorLogin = [
    check("email").exists().notEmpty().isEmail(),
    check("password").exists().notEmpty().isLength({min: 3, max: 15}),
    (req, res, next) => {
        return validateResults(req, res, next);
    }
];

const validatorPassword = [
    check("email").exists().notEmpty().isEmail(),
    check("password").exists().notEmpty().isLength({min: 3, max: 15}),
    (req, res, next) => {
        return validateResults(req, res, next);
    }
];

module.exports = {validatorRegister, validatorLogin, validatorPassword};
