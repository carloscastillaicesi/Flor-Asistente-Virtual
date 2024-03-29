const { MessagingResponse } = require('twilio').twiml;
const { encrypt, decrypt } = require('./crypto');
/* Other way to send messages in twilio
const { ModelBuildContext } = require("twilio/lib/rest/preview/understand/assistant/modelBuild");*/

const client = require("twilio")(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

/**
 * Twilio message object doesn't do a good job giving the type of media that is sent. 
 * Therefore, if you are using this with Twilio Whatsapp, it's necessary for order to 
 * provide a better way to detect what the user is sending. 
 * For example, if user sends image and text, or video an text, 
 */
var mediaTypeClassifier = (req) => {
  var mediaType = req.MediaContentType0;
  var body = req.Body;
  var long = req.Latitude;
  var latitude = req.Longitude;
  if (mediaType) {
    if (mediaType.includes("image") && body.length < 1) {
      return "image";
    } else if (mediaType.includes("image") && body.length > 1) {
      return "image_text";
    } else if (mediaType.includes("video") && body.length < 1) {
      return "video";
    } else if (mediaType.includes("video") && body.length > 1) {
      return "video_text";
    } else if (mediaType.includes("audio")) {
      return "audio";
    } else if (mediaType.includes("pdf")) {
      return "pdf";
    } else if (mediaType.includes("vcard")) {
      return "vcard";
    }
  } else if (long || latitude) {
    if (long.length > 1 && latitude.length > 1) {
      return "geometry";
    }
  } else if (body.includes(".doc") || body.includes(".docx") || body.includes(".xls") || body.includes(".xlsx") || body.includes(".csv") || body.includes(".ppt") || body.includes(".pptx") || body.includes(".html") || body.includes(".exe")) {
    return "other";
  } else {
    return "noMedia";
  }
}

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
function Mssg(mediaType, mssg, id) {
  var newMssg;
  if (mediaType) {
    switch (mediaType) {
      case 'image':
      case 'video':
      case 'audio':
      case 'pdf':
      case 'vcard':
        newMssg = {
          from: id,
          messageType: mediaType,
          body: mssg.MediaUrl0
        };
        break;
      case 'image_text':
      case 'video_text':
        newMssg = {
          from: id,
          body: mssg.Body,
          messageType: mediaType,
          body: mssg.MediaUrl0,
        };
        break;
      case 'geometry':
        newMssg = {
          from: id,
          messageType: mediaType,
          latitude: mssg.Latitude,
          longitude: mssg.Longitude
        };
        break;
      case 'other':
        newMssg = {
          from: id,
          messageType: mediaType,
          body: mssg.Body,
        };
        break;
      case 'noMedia':
        newMssg = {
          from: id,
          messageType: mediaType,
          body: mssg.Body,
        };
        break;
      default:
        newMssg = mssg
    }
    return newMssg;
  }
}

const receiveTMessage = (req) => {
  return new Mssg(mediaTypeClassifier(req), req, encrypt(getNumber(req.From)));
};

const sendTMessage = (res, mssg, image) => {
  // const twiml = new MessagingResponse();
  // const messages = twiml.message();
  // // let NewUserMessage = 
  // messages.body(NewUserMessage);
  message = new MessagingResponse().message(mssg ? mssg.toString() : "error");
  image && message.media(image);
  res.set('Content-Type', 'text/xml');
  res.send(message.toString()).status(200);
};


const sendCustomTMessageImage = (body, number, media) => {
  client.messages.create({
    mediaUrl: media ? [media] : "",
    from: 'whatsapp:+14155238886',
    to: number,
    body: body ? body : ""
  }).then(message => console.log(message.sid));

};

const sendCustomTMessage = (body, number) => {
  client.messages.create({
    from: 'whatsapp:+14155238886',
    to: number,
    body: body ? body : ""
  }).then(message => console.log(message.sid));

};

const sendCustomTDocument = (body, number) => {
  client.messages.create({
    from: 'whatsapp:+14155238886',
    to: `whatsapp:${decrypt(number)}`,
    body: body ? body : ""
  }).then(message => console.log(message.sid));

};

var vCardsJS = require('vcards-js');


const sendCustomTVCard = (body, number, targetPhone) => {
  // var vCard = vCardsJS();
  // vCard.firstName = name;
  // vCard.photo.attachFromUrl(pic, 'JPEG');
  // vCard.workPhone = decrypt(targetPhone);
  // vCard.saveToFile(`./${name}.vcf`);
  // console.log(vCard.getFormattedString());
  client.messages.create({
    from: 'whatsapp:+14155238886',
    to: `whatsapp:${decrypt(number)}`,
    body: `${body} ${decrypt(targetPhone)}`,

  }).then(message => console.log(message.sid));
};



module.exports = { sendTMessage, receiveTMessage, sendCustomTMessage, sendCustomTMessageImage, sendCustomTVCard, sendCustomTDocument };