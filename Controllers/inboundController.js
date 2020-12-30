const nlpEngineApp = require('../Controllers/nlpEngineApp');
const { activityClassifier } = require('./intentControllers/ActivityProcessor');

const { receiveTMessage, sendTMessage, sendCustomTMessage } = require("./messagingController");
var userMessageController = require('./userMessageController');
var { dialogController } = require('./dialogController');


const inboundReceiver = async (req, res) => {
  var newMssg = receiveTMessage(req.body);
  var user = await userMessageController.userCheck(newMssg);
  if (user === "new user") {
    setTimeout(() => {
      sendTMessage(res, `Hola bienvenid@, Soy Flor la asistente virtual de Sembrando Vida 👩‍🌾. Me gusta ayudar a las personas y orientarlas desde mis experiencias y saberes🙌🌱`)
    }, 1000);

    setTimeout(() => {
      sendCustomTMessage("*¿Quieres compartir alguna información tuya conmigo ?* \n \n 😊 Esta información alimentará la *_Red de Sembrando Vida_ *, se utilizará con fines sin ánimo de lucro y para el desarrollo de actividades de la red. Alguna de esta información será para crear tu perfil y que otras personas puedan encontrarte.", req.body.From);
    }, 2500);
    setTimeout(() => {
      sendCustomTMessage("Piensa que es como sembrar una semilla, que hará cada día más fuerte a Sembrando Vida. Tu información alimentará el proceso de fortalecer dicha semilla para que crezca fuerte 🌱", req.body.From);
    }, 4500);

  } else {
    var nlp = await nlpEngineApp(user)
    console.log("inbound intent", nlp)
    var dialog = await dialogController(nlp)
    console.log("inbound dialog", dialog)
    // var mssg = await activityClassifier(dialog);
    // console.log("inbound mssg", mssg)
    // sendTMessage(res, mssg);
  }

}


module.exports = {
  inboundReceiver
};

