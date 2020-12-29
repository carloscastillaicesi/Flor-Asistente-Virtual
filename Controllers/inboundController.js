const nlpEngineApp = require('../Controllers/nlpEngineApp');
const nlpOnIntent = require('./intentControllers/nlpOnIntentProcessor');

const { receiveTMessage, sendTMessage } = require("./messagingController");
var userMessageController = require('./userMessageController');
var { dialogController } = require('./dialogController');
// after `newbot build`

/** Create something to get the user info and then the message info an then append de the NLP processing
 */

const inboundReceiver = (req, res) => {
  var newMssg = receiveTMessage(req.body);
  userMessageController.userCheck(newMssg)
    .then((userMssg) => nlpEngineApp(userMssg))
    .then((classifiedMssg) => dialogController(classifiedMssg))
    .then((result) => nlpOnIntent.intentClassifier(result))
    .then((result) => console.log("inbound console", result));

  //
  // .then((mssg) => sendTMessage(res, mssg));
  // 

}


module.exports = {
  inboundReceiver
};

