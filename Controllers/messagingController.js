const MessagingResponse = require("twilio").twiml.MessagingResponse;

/* Other way to send messages in twilio
const { ModelBuildContext } = require("twilio/lib/rest/preview/understand/assistant/modelBuild");*/

const client = require("twilio")(
 process.env.TWILIO_ACCOUNT_SID,
 process.env.TWILIO_AUTH_TOKEN
);


const sendTMessage = (res, mssg) => {
 // Start our TwiML response.
 const twiml = new MessagingResponse();
 const messages = twiml.message();
 let NewUserMessage = mssg.answer.toString();
 messages.body(NewUserMessage);
 res.writeHead(200, { "Content-Type": "text/xml" });
 res.end(twiml.toString());
};

module.exports = { sendTMessage }; 