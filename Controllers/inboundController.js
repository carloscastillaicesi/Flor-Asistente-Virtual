const nlpEngineApp = require('../Controllers/nlpEngineApp');
const { activityClassifier } = require('./intentControllers/ActivityProcessor');

const { receiveTMessage, sendTMessage, sendCustomTMessage, sendCustomTMessageImage } = require("./messagingController");
var userMessageController = require('./userMessageController');
var { dialogController } = require('./dialogController');


const inboundReceiver = async (req, res) => {

  var newMssg = receiveTMessage(req.body);
  var user = await userMessageController.userCheck(newMssg);
  console.log("userCheck", user)
  if (user === "new user") {
    sendTMessage(res, ` ¡Hola! Soy *Flor* la asistente virtual de Sembrando Vida 👩‍🌾. Me gusta ayudar a las personas y orientarlas desde mis experiencias y saberes 🙌🌱\n \n*¡Quisiera conocerte mejor!* 😊 \n \nLa información que te pediré a continuación alimentará la *Red de Sembrando Vida*, se utilizará con fines sin ánimo de lucro y para el desarrollo de actividades de la red. \n \n_Esta información será usada para crear tu perfil en el mapa y que otras personas puedan encontrarte._`, "https://i.ibb.co/dpjWTjT/Saludo.png")

    setTimeout(() => {
      sendCustomTMessage(`Tu información alimentará tu semilla de información para que crezca fuerte, lo que hará cada día más fuerte a Sembrando Vida 🌱\n\n_Para poder comenzar, dime_\n \n*¿Puedo guardar tu número de celular y disponer de la información que me compartas en esta conversacion?*  `, req.body.From);
    }, 5000);

  } else {
    var nlp = await nlpEngineApp(user)
    console.log("\n inbound intent \n", nlp)
    var dialog = dialogController(nlp)
    console.log("\ninbound dialog\n", dialog)
    var mssg = dialog ? await activityClassifier(dialog) : "No entendí lo que dijiste.Por favor, repítelo 🙈";
    console.log("\ninbound mssg\n", mssg)
    if (typeof mssg === "string") {
      sendTMessage(res, mssg ? mssg : "No entendí lo que dijiste.Por favor, repítelo 🙈");
    } else {
      sendTMessage(res, mssg.answer ? mssg.answer : "No entendí lo que dijiste.Por favor, repítelo 🙈", mssg.image);
      setTimeout(() => {
        sendCustomTMessage(mssg.message ? mssg.message : "No entendí lo que dijiste.Por favor, repítelo 🙈", req.body.From);
      }, mssg.time);
    }
  }
}

module.exports = {
  inboundReceiver
};

