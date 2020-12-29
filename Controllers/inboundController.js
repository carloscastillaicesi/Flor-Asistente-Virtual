const nlpEngineApp = require('../Controllers/nlpEngineApp');
const { activityClassifier } = require('./intentControllers/ActivityProcessor');

const { receiveTMessage, sendTMessage } = require("./messagingController");
var userMessageController = require('./userMessageController');
var { dialogController } = require('./dialogController');
// after `newbot build`

/** Create something to get the user info and then the message info an then append de the NLP processing
 */

const inboundReceiver = async (req, res) => {
  var newMssg = receiveTMessage(req.body);
  var user = await userMessageController.userCheck(newMssg);
  if (user === "new user") {
    sendTMessage(res, "Dime tu nombre")
  } else {
    var nlp = await nlpEngineApp(user)
    console.log("inbound intent", nlp)
    var dialog = await dialogController(nlp)
    console.log("inbound dialog", dialog)
    var mssg = await activityClassifier(dialog);
    console.log("inbound mssg", mssg)
    // sendTMessage(res, mssg);
  }

}


module.exports = {
  inboundReceiver
};

