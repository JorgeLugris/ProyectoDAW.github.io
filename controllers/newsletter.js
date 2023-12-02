const sendEmail = require("../utils/sendEmail");
const {handleHttpError} = require("../utils/handleError");
const sendNewsletter = async (req, res) => {
    const {email} = (req.body);
    try {

        //Variable del mensaje que se le enviará al usuario.
        const message = `
        <h1>Se ha registrado correctamente a la newsletter de <b>WILDTRAVEL</b></h1>
        <hr>
        <p><i>Desde el equipo de WildTravel le queremos agradecer enormemente que se haya registrado a nuestra newsletter... Atento a las nuevas noticias para no perderte ningún gran evento!</i></p>`

        //Enviamos el mensaje.
        await sendEmail({
            to: email,
            subject: "Suscripción newsletter",
            text: message,
        });

        res.send("Se ha enviado el email correctamente");

    } catch (e) {
        //En caso de error.
        handleHttpError(res, "ERROR_REGISTER_USER", 403);
    }

}

module.exports = {sendNewsletter}