//Manejador de errores.
const handleHttpError = (res, message, code) => {
    res.status(code);
    res.send({error: message});
}

//Exporta el módulo.
module.exports = {handleHttpError};