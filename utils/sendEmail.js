// Importar librerías
require('dotenv').config();
const nodemailer = require('nodemailer');

//Opciones para enviar el email al cliente.
const sendEmail = (options) => {
    const transporter = nodemailer.createTransport({
        service: "SendGrid",
        host: "smtp.sendgrid.net",
        port: 25,
        secure: false,
        auth: {
            user: process.env.EMAIL_USERNAME,
            pass: process.env.EMAIL_PASSWORD
        }
    });

    const mailOptions = {
        from: "WildTravel888@gmail.com",
        to: options.to,
        subject: options.subject,
        html: options.text
    }

    transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
            console.log(err);
        } else {
            console.log(info);
        }
    });
}

//Exportamos el módulo.
module.exports = sendEmail;