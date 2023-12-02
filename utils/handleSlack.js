// Importar librerías
const {IncomingWebhook} = require('@slack/webhook');
const morganBody = require("morgan-body");
const webHook = new IncomingWebhook(process.env.SLACK_WEBHOOK);

//Utiliza un bot de "Slack" para qué me envié los errores de la página.
//Envía cada error de estado que este por encima del número "400", ya que los que están por debajo son advertencias o que ha ido "ok".
const slackBot = (app) => {

    const loggerStream = {
        write: message => {
            webHook.send({
                text: message
            })
            console.log('capturando el LOG', message);
        },
    }

    morganBody(app, {
        noColors: true,
        skip: function (req, res) {
            return (res.statusCode < 400);
        },
        stream: loggerStream
    });

}
//Exporta el módulo
module.exports = slackBot;