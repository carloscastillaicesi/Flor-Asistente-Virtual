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
      pDialog = Object.assign(dialog, { activity: "Tengo", step: 0, answer: "Genial! Entonces dime 😀 \n\n*¿Qué nombre deseas ponerle a lo que tienes para intercambiar?* 💚\n\n  _Recuerda que solo puedes registar un producto o servicio a la vez_\n\n  _Por favor, para poder registrar correctamente el nombre de tu anuncio inicia tu respuesta con la frase *'el nombre del intercambio es'* seguido del *nombre que desees ponerle a este anuncio*_ " })
      break;
    case "necesito":
      pDialog = Object.assign(dialog, { activity: "Necesito", step: 0, answer: "*Listo* 🌳👩‍🌾 Para hacer este registro, primero dime \n\n*¿Qué nombre deseas ponerle al anuncio de lo que necesitas?*\n\n  _Recuerda que solo puedes registrar un anuncio a la vez_ \n\n  _Por favor, para poder registrar correctamente el nombre de tu anuncio inicia tu respuesta con la frase *'el nombre del anuncio es'* seguido del *nombre que desees ponerle a este anuncio*_  " })
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