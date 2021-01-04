var { userModify } = require('../globalCRUD');

/**
 * Creates a
 * Using property value shorthand
 * @constructor
 * @params id - number passed in the Twilio Message Object
 * @params stage - number passed in the Twilio Message Object
 * @params registered - number passed in the Twilio Message Object
 * This is called a constructor Function
*/

function register({ geometry, activity, nextStep, level, name, pic }) {
  return { geometry: geometry ? geometry : [], activity: activity, step: nextStep, level: level, name: name ? name : "", pic: pic ? pic : "" };
}


function processedEntity(dialog) {
  var pDialog;
  switch (dialog.intent) {
    case "name":
      var searchTerm;
      if (dialog.body.toLowerCase().includes("es")) {
        searchTerm = "es";
      } else if (dialog.body.toLowerCase().includes("llamo")) {
        searchTerm = "llamo";
      } else if (dialog.body.toLowerCase().includes("soy")) {
        searchTerm = "soy ";
      }
      const indexOfFirst = dialog.body.indexOf(searchTerm) + searchTerm.length;
      var name = toTitleCase(dialog.body).slice(indexOfFirst + 1, dialog.body.length)
      pDialog = Object.assign(dialog, { name: name, answer: customAnswer(dialog, name) })
      break;
    case "image":
      var image = dialog.body;
      pDialog = Object.assign(dialog, { pic: image, answer: dialog.answer })
      break;
    case "geometry":
      var geometry = [dialog.latitude, dialog.longitude];
      pDialog = Object.assign(dialog, { geometry: geometry, answer: dialog.answer, activity: "Detailed" })
      break;
    default:
      pDialog = dialog
      break;
  }
  return pDialog;
}

const toTitleCase = (phrase) => {
  return phrase
    .toLowerCase()
    .replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '')
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

function customAnswer(dialog, replace) {
  var answer = dialog.answer;
  answer = answer.replace(dialog.uEntity, replace);
  return answer
}

registration = async (intent, dialog) => {
  // var fn = intent.toString().trim().toLowerCase();
  // if (fn in global && typeof global[fn] === "function") {
  //   return global[fn](dialog);
  // } else {

  dialogP = processedEntity(dialog)
  console.log("processedEntity", register(dialogP))
  await userModify(register(dialogP), dialog.id);
  return dialog.answer;

}
// }


module.exports = registration; 