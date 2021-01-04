var { detailModify, getDetails, userModify } = require('../globalCRUD');

/**
 * Creates a
 * Using property value shorthand
 * @constructor
 * @params id - number passed in the Twilio Message Object
 * @params stage - number passed in the Twilio Message Object
 * @params registered - number passed in the Twilio Message Object
 * This is called a constructor Function
*/

// function detail({ ubicacionHuerta, gallery, beneficiosSalud, expectativaHuerta, encargadosHuerta, tiempoDedicadoHuerta, experiencia, tiempoExperiencia, conocimiento }) {
//  return { ubicacionHuerta: ubicacionHuerta ? ubicacionHuerta : "", gallery: gallery ? gallery : [], beneficiosSalud: beneficiosSalud ? beneficiosSalud : "", expectativaHuerta: expectativaHuerta ? expectativaHuerta : "", encargadosHuerta: encargadosHuerta ? encargadosHuerta : "", tiempoDedicadoHuerta: tiempoDedicadoHuerta ? tiempoDedicadoHuerta : "", experiencia: experiencia ? experiencia : "", conocimiento: conocimiento ? conocimiento : "" };
// }

function register({ geometry, activity, nextStep, level, name, pic }) {
 return { geometry: geometry ? geometry : [], activity: activity, step: nextStep, level: level, name: name ? name : "", pic: pic ? pic : "" };
}


async function processedEntity(dialog) {
 var details;

 switch (dialog.intent) {
  case "image":
   d = await getDetails(dialog.id);
   var galeria = [...d.gallery]
   galeria.push(dialog.body)
   details = Object.assign(d, { gallery: galeria })
   await detailModify(details, dialog.id);
   break;

  default:
   pDialog = dialog
   break;
 }
 return details;
}


function customAnswer(dialog) {
 var answer;
 console.log("dialog.uEntity", dialog.uEntity);
 if (dialog.uEntity.includes("link")) {
  answer = dialog.answer;
  answer = answer.replace("{link}", `https://9c49a31cb4df.ngrok.io/user/${dialog.id}`);
 } else {
  answer = dialog.answer;
 }
 return answer;
}


detailed = async (intent, dialog) => {
 await processedEntity(dialog);
 await userModify(register(dialog), dialog.id);
 return customAnswer(dialog);

}


module.exports = detailed; 