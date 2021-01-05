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
 console.log("\n\n dialog.intent[0] \n\n", dialog.intent)
 switch (dialog.intent) {
  case "tengo":
   pDialog = Object.assign(dialog, { activity: "Tengo", step: 0, answer: "Genial! Entonces dime 😀 *¿Qué nombre deseas ponerle a lo que tienes para intercambiar?* 💚  _Recuerda que solo puedes registar un producto o servicio a la vez _" })
   break;
  case "necesito":
   pDialog = Object.assign(dialog, { activity: "Necesito", step: 0, answer: "*Listo* 🌳👩‍🌾 para hacer este registro primero dime *¿Qué nombre deseas ponerle al anuncio?_Recuerda que solo puedes registrar una cosa a la vez,  pueden ser cosechas/cultivos, semillas, insumos, abonos organicos, saberes e información o redes de apoyo_  " })
   break;
  case "tengo":
   break;
  case "buscoDocumento":
   break;
  case "documento":

   break;
  case "buscoNecesito":

   break;

  case "buscoNecesito":

   break;

  default:
   break;
 }

 return pDialog;
}


menu = async (dialog) => {
 dialogP = processedEntity(dialog)
 await userModify(register(dialogP), dialog.id);
 return dialogP.answer;
}



module.exports = menu; 