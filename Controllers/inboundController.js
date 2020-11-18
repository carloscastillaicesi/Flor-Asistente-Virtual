var nlpEngineApp = require('../Controllers/nlpEngineApp');
var nlpOnIntent = require('./intentControllers/nlpOnIntentProcessor');
var TMessagingController = require("./messagingController");
const { encrypt, decrypt } = require('./crypto');
/**
 * Parses a string to get a number 
 * @param {string} input - number passed in the Twilio Message Object
*/
var getNumber = (input) => { return input.slice(input.lastIndexOf("+")) };

/**
 * cleans the incoming Twilio Message object, just getting what i want.
 * Using property value shorthand 
 * @constructor 
 * @params number - number passed in the Twilio Message Object
 * @params body - number passed in the Twilio Message Object
 * @params media - number passed in the Twilio Message Object
 * @params type - number passed in the Twilio Message Object
 * This is called a constructor Function
*/
function Mssg(number, body, media, type) { return { number, body, media, type } };

/**
 */

const inboundReceiver = (req, res) => {

  var mssg = req.body;
  let body = mssg.Body, from = getNumber(mssg.From), media = mssg.MediaUrl0, type = mssg.MediaContentType0;

  /**
   * Uses nlp.js thats wrapped inside a controller module and 
   * @returns a 
   */

  console.log(req.body);


  let newMssg = new Mssg(encrypt(from), body, media, type);
  nlpEngineApp(newMssg)
    .then((result) => nlpOnIntent.intentClassifier(result))
    .then((result2) => TMessagingController.sendTMessage(res, result2))
    .catch((error) => console.log(error.message));
}

//const text = decrypt(hash);

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
