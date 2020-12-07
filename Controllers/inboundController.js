const nlpEngineApp = require('../Controllers/nlpEngineApp');
const nlpOnIntent = require('./intentControllers/nlpOnIntentProcessor');
const { receiveTMessage, sendTMessage } = require("./messagingController");
var userMessageController = require('./userMessageController');

/** Create something to get the user info and then the message info an then append de the NLP processing
 */

const inboundReceiver = (req, res) => {
  var newMssg = receiveTMessage(req.body);
  userMessageController.userCheck(newMssg)
    .then((result) => nlpEngineApp(result))
    .then((result) => nlpOnIntent.intentClassifier(result))
    .then((result) => console.log(result))
    .catch((error) => console.log(error.message));
  // .then((result) => nlpOnIntent.intentClassifier(result))
  // .then((result) => TMessagingController.sendTMessage(res, result))
  // 
}


module.exports = {
  inboundReceiver
};

