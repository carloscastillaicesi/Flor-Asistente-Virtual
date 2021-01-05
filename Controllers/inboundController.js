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

    sendCustomTMessageImage("¡Hola! Soy *Flor* la asistente virtual de Sembrando Vida 👩‍🌾. Me gusta ayudar a las personas y orientarlas desde mis experiencias y saberes🙌🌱", req.body.From, "https://i.ibb.co/dpjWTjT/Saludo.png")

    setTimeout(() => {
      sendTMessage(res, ` *¡Quisiera conocerte mejor!* 😊 \n \nLa información que te pediré a continuación alimentará la *Red de Sembrando Vida*, se utilizará con fines sin ánimo de lucro y para el desarrollo de actividades de la red. \n \n Alguna de esta información será para crear tu perfil y que otras personas puedan encontrarte. Piensa que es como sembrar una semilla de información, que hará cada día más fuerte a Sembrando Vida. Tu información alimentará el proceso de fortalecer dicha semilla para que crezca fuerte 🌱*`)
    }, 5000);
    setTimeout(() => {
      sendCustomTMessage(`Para poder comenzar, dime *¿Puedo guardar tu número de celular y disponer de la información que me compartas?*`, req.body.From);
    }, 5500);

  } else {
    var nlp = await nlpEngineApp(user)
    console.log("\n inbound intent \n", nlp)
    var dialog = dialogController(nlp)
    console.log("\ninbound dialog\n", dialog)
    var mssg = await activityClassifier(dialog);
    console.log("\ninbound mssg\n", mssg)

    if (typeof mssg === "string") {
      sendTMessage(res, mssg);
    } else {
      sendCustomTMessageImage(mssg.answer, req.body.From, mssg.image);
      setTimeout(() => {
        sendCustomTMessage(mssg.message, req.body.From);
      }, 10000);
    }

  }
}

module.exports = {
  inboundReceiver
};

