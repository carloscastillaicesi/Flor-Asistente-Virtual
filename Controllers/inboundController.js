var nlpEngineApp = require('../Controllers/nlpEngineApp');
var nlpOnIntent = require('./intentControllers/nlpOnIntentProcessor');
const { receiveTMessage, sendTMessage } = require("./messagingController");
var userMessageController = require('./userMessageController');

/** Create something to get the user info and then the message info an then appen de the NLP processing
 */

const inboundReceiver = (req, res) => {
  console.log(req.body);
  var newMssg = receiveTMessage(req.body);
  // userMessageController.userCheck(req)
  //   .then((result) => console.log(result))
  //   .catch((error) => console.log(error.message));
  // .then((result) => nlpEngineApp(result))
  // .then((result) => nlpOnIntent.intentClassifier(result))
  // .then((result) => TMessagingController.sendTMessage(res, result))
  // 
}


module.exports = {
  inboundReceiver
};

