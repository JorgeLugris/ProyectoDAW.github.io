const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;

//Debes de pasar el objeto del usuario
const tokenSign = async (user) => {
    return jwt.sign({
            _id: user._id,
            role: user.role
        },
        JWT_SECRET,
        {
            expiresIn: "1h",
        }
    );

};

// Debes de pasar el token de session el JWT
const verifyToken = async (tokenJwt) => {
    try {
        return jwt.verify(tokenJwt, JWT_SECRET)
    } catch (e) {
        return null
    }
};

module.exports = {tokenSign, verifyToken}