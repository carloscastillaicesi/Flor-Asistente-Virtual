const { encrypt, decrypt } = require('./crypto');

const getMessageType = (message) => {
  var keys = Object.keys(message);
  var messageType = keys.pop();
  console.log(messageType);
  return messageType;
};


const mediaType = async (message, bot) => {
  var newMssg;

  var type = getMessageType(message);
  if (message) {
    switch (getMessageType(message)) {
      case 'text':
        newMssg = {
          messageType: 'noMedia',
          body: message.text
        };
        break;
      case 'photo':
      case 'caption':
        var photoURL = await bot.telegram.getFileLink(message.photo[2].file_id);
        newMssg = {
          messageType: 'image',
          body: photoURL.href
        };
        break;
      case 'location':
        newMssg = {
          messageType: "geometry",
          latitude: message.location.latitude,
          longitude: message.location.longitude
        };
        break;

      default:
        newMssg = {
          from: id,
          messageType: type,
          body: type,
        };
    }
    return { ...newMssg, from: encrypt(message.from.id.toString()) };
  }
}



module.exports = {
  mediaType
};

