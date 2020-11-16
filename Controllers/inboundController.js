var nlpEngineApp = require('../Controllers/nlpEngineApp');
var nlpOnIntent = require('./intentControllers/nlpOnIntentProcessor');
var TMessagingController = require("./messagingController");


const getNumber = (input) => {
  var index = input.lastIndexOf("+");
  var number = input.slice(index);
  return number;
};

//cleans the incoming Twilio Message object, just getting what i want. 
var makeUser = (_id, _number, _body, _media, _type) => {

  return {
    id: _id,
    number: _number,
    body: _body,
    media: _media,
    type: _type,
  }
};

const inboundReceiver = (req, res) => {

  var mssg = req.body;
  let body = mssg.Body, from = getNumber(mssg.From), media = mssg.MediaUrl0, type = mssg.MediaContentType0, id = mssg.AccountSid;

  nlpEngineApp(makeUser(id, from, body, media, type))
    .then((result) => nlpOnIntent.intentClassifier(result))
    .then((result2) => {
      TMessagingController.sendTMessage(res, result2.answer);
    }).catch((error) => console.log(error.message));
}


module.exports = {
  inboundReceiver
};


// switch (req.body.MediaContentType0) {

//   case "image/jpeg":

//     body = "image/jpeg";
//     break;

//   case "'text/vcard'":
//     body = "image/jpeg";
//     break;

//   case "application/pdf":
//     body = "image/jpeg";
//     break;

//   case "application/pdf":
//     body = "image/jpeg";
//     break;

//   default:
//     body = req.body.Body;
//     break;


// }

//application/pdf
//video/mp4
//'text/vcard'
//image/jpeg
