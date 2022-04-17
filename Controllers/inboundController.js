const nlpEngineApp = require('../Controllers/nlpEngineApp');
const { activityClassifier } = require('./intentControllers/ActivityProcessor');
var { userTData } = require('./globalCRUD');
const { receiveTMessage, sendTMessage, sendCustomTMessage, sendCustomTMessageImage } = require("./messagingController");
var userMessageController = require('./userMessageController');
var { dialogController } = require('./dialogController');
const { mediaType } = require('./telegramConverter')


const inboundReceiver = async (req, res) => {

  var newMssg = receiveTMessage(req.body);

  var user = await userMessageController.userCheck(newMssg);

  console.log("userCheck", user)
  if (user === "new user") {
    sendTMessage(res, `¡Hola! Soy Flor la asistente virtual de Sembrando Vida 👩‍🌾. Me gusta ayudar a las personas y orientarlas desde mis experiencias y saberes 🙌🌱\n \n*¡Quisiera conocerte mejor!* 😊 \n \n _La información que te pediré a continuación será usada para crear tu perfil en el mapa y que otras personas puedan encontrarte._`, "https://i.ibb.co/dpjWTjT/Saludo.png")

    setTimeout(() => {
      sendCustomTMessage(`Para poder comenzar, dime\n\n*¿Puedo guardar tu número de celular y disponer de la información que me compartas en esta conversación?*`, req.body.From);
      // sendCustomTMessage(`Tu información alimentará tu semilla de información para que crezca fuerte, lo que hará cada día más fuerte a Sembrando Vida 🌱\n\nPara poder comenzar, dime\n\n*¿Puedo guardar tu número de celular y disponer de la información que me compartas en esta conversación?*`, req.body.From);
    }, 5000);
  } else {
    var nlp = await nlpEngineApp(user)
    console.log("\n inbound intent \n", nlp)
    var dialog = dialogController(nlp)
    userTData(user, nlp);
    console.log("\ninbound dialog\n", dialog)
    var mssg = await activityClassifier(dialog);
    console.log("\ninbound mssg\n", mssg)
    if (typeof mssg === "string") {
      setTimeout(() => {
        sendTMessage(res, mssg);
      }, 1000);
    } else {
      setTimeout(() => {
        sendTMessage(res, mssg.answer, mssg.image);
      }, 1000);
      setTimeout(() => {
        sendCustomTMessage(mssg.message, req.body.From);
      }, mssg.time ? mssg.time : 1000);
    }

  }

}

const inboundReceiverTelegram = async (mssg, bot) => {

  var newMssg = await mediaType(mssg.message, bot)
  var user = await userMessageController.userCheck(newMssg);
  console.log("userCheck", user)
  if (user === "new user") {
    mssg.replyWithPhoto({
      url: 'https://i.ibb.co/dpjWTjT/Saludo.png'
    });
    setTimeout(() => {
      mssg.replyWithMarkdown(`¡Hola! Soy Flor la asistente virtual de Sembrando Vida 👩‍🌾. Me gusta ayudar a las personas y orientarlas desde mis experiencias y saberes 🙌🌱\n \n*¡Quisiera conocerte mejor!* 😊 \n\n _La información que te pediré a continuación será usada para crear tu perfil en el mapa y que otras personas puedan encontrarte._`);
    }, 1000);
    setTimeout(() => {
      mssg.replyWithMarkdown(`Para poder comenzar, dime\n\n*¿Puedo guardar tu número de celular y disponer de la información que me compartas en esta conversación?*`);
    }, 3000);

  } else {
    var nlp = await nlpEngineApp(user)
    //console.log("\n inbound intent \n", nlp)
    var dialog = dialogController(nlp)
    userTData(user, nlp);
    // console.log("\ninbound dialog\n", dialog)
    var activity = await activityClassifier(dialog);

    if (typeof activity === "string") {
      console.log("\ninbound mssg\n", activity)
      return activity.toString();

    } else {
      activity.image && mssg.replyWithPhoto({
        url: activity.image
      });
      setTimeout(() => {
        activity.answer && mssg.replyWithMarkdown(activity.answer.toString());
      }, activity.time ? activity.time : 1000);

      setTimeout(() => {
        activity.message && mssg.replyWithMarkdown(activity.message.toString());
      }, activity.time ? activity.time : 2000);


    }
  }

}

module.exports = {
  inboundReceiver, inboundReceiverTelegram
};

