const nlpEngineApp = require('../Controllers/nlpEngineApp');
const nlpOnIntent = require('./intentControllers/nlpOnIntentProcessor');
const { receiveTMessage, sendTMessage } = require("./messagingController");
var userMessageController = require('./userMessageController');

// after `newbot build`

/** Create something to get the user info and then the message info an then append de the NLP processing
 */

const inboundReceiver = (req, res) => {
  var newMssg = receiveTMessage(req.body);
  userMessageController.userCheck(newMssg)
    .then((result) => nlpEngineApp(result))
    .then((result) => console.log(result));
  // .then((result) => sendTMessage(res, result))
  // .then((result) => nlpOnIntent.intentClassifier(result))
  // .then((result) => console.log(result))
  // .catch((error) => console.log(error.message));
  // .then((result) => nlpOnIntent.intentClassifier(result))
  // 
  // 
}


module.exports = {
  inboundReceiver
};

