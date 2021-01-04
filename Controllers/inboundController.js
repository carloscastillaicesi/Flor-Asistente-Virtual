const nlpEngineApp = require('../Controllers/nlpEngineApp');
const { activityClassifier } = require('./intentControllers/ActivityProcessor');

const { receiveTMessage, sendTMessage, sendCustomTMessage } = require("./messagingController");
var userMessageController = require('./userMessageController');
var { dialogController } = require('./dialogController');


const inboundReceiver = async (req, res) => {

  var newMssg = receiveTMessage(req.body);
  var user = await userMessageController.userCheck(newMssg);
  console.log("userCheck", user)
  if (user === "new user") {


    sendCustomTMessage("¡Hola! Soy *Flor* la asistente virtual de Sembrando Vida 👩‍🌾. Me gusta ayudar a las personas y orientarlas desde mis experiencias y saberes🙌🌱", req.body.From)


    setTimeout(() => {
      sendTMessage(res, ` *¡Quisiera conocerte mejor!* 😊 \n \nLa información que te pediré a continuación alimentará la *Red de Sembrando Vida*, se utilizará con fines sin ánimo de lucro y para el desarrollo de actividades de la red. \n \n Alguna de esta información será para crear tu perfil y que otras personas puedan encontrarte. Piensa que es como sembrar una semilla de información, que hará cada día más fuerte a Sembrando Vida. Tu información alimentará el proceso de fortalecer dicha semilla para que crezca fuerte 🌱\n \n Para poder comenzar, dime *¿Puedo guardar tu número de celular y disponer de la información que me compartas?*`)
    }, 3000);

  } else {
    var nlp = await nlpEngineApp(user)
    console.log("\n inbound intent \n", nlp)
    var dialog = dialogController(nlp)
    console.log("\ninbound dialog\n", dialog)
    var mssg = await activityClassifier(dialog);
    console.log("\ninbound mssg\n", mssg)
    sendTMessage(res, mssg);
  }
}

module.exports = {
  inboundReceiver
};

