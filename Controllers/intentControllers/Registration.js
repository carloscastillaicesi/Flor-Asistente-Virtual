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
error = () => {
  return "error";
};

none = () => {

  return "none";
};



function processedEntity(dialog) {
  var pDialog;
  switch (dialog.intent) {
    case "name":
      var name = dialog.body
      name = name.slice(dialog.entities[0].end + 2, dialog.body.length)
      var answer = dialog.answer;
      answer = answer.replace("#name", name);
      pDialog = Object.assign(dialog, { name: name, answer: answer })
      break;
  }
  return pDialog;
}


registration = async (intent, dialog) => {
  var fn = intent.toString().trim().toLowerCase();

  if (fn in global && typeof global[fn] === "function") {
    return global[fn](dialog);
  } else {
    if (dialog.entities === "No Entities") {
      await userModify(register(dialog), dialog.id);
      return dialog.answer;
    } else {
      dialog = processedEntity(dialog)
      await userModify(register(dialog), dialog.id);
      return dialog.answer;
    }
  }
}








module.exports = registration; 