var { userModify } = require('../globalCRUD');
var fs = require("fs");
var fileData = fs.readFileSync('dialog.json');
var file = JSON.parse(fileData);
var dialog = file.dialog
var { getBarter } = require('../globalCRUD');

function check(activity, step) {
  return dialog.filter(f => f.activity === activity && f.step === step)
}
/**
 * Creates a
 * Using property value shorthand
 * @constructor
 * @params id - number passed in the Twilio Message Object
 * @params stage - number passed in the Twilio Message Object
 * @params registered - number passed in the Twilio Message Object
 * This is called a constructor Function
*/

function register({ geometry, activity, step, level, name, pic }) {
  return { geometry: geometry ? geometry : [], activity: activity, step: step, level: level, name: name ? name : "", pic: pic ? pic : "" };
}


function processedEntity(dialog) {
  var pDialog;

  switch (dialog.intent) {
    case "out":
      if (dialog.level === 0) {
        pDialog = Object.assign(dialog, { activity: "Registration", nextStep: dialog.step, answer: "¡Hasta la próxima! estaré pendiente para que continuemos el registro de tu información para poder plantar esta semilla en el mapa de sembrando Vida. ¡Hasta la próxima! 😀 🙌" })
      } else if (dialog.level === 1) {
        pDialog = Object.assign(dialog, { activity: "Registration", nextStep: dialog.step, answer: "Si necesitas algo mas no dudes en saludarme de nuevo, estaré pendiente para que continuemos el registro de la información para pasar hacer germinar tu semilla de información. ¡Hasta luego! 😀 🙌" })
      } else if (dialog.level === 2) {
        pDialog = Object.assign(dialog, { activity: "Registration", nextStep: dialog.step, answer: "Si necesitas algo mas no dudes en saludarme de nuevo, estaré pendiente para que continuemos el registro de la información para que tu semilla de informacion se convierta en una plántula. ¡Hablamos pronto! 😀 🙌" })
      } else if (dialog.level >= 3) {
        pDialog = Object.assign(dialog, { activity: "Options", step: 1, answer: "Si necesitas algo más, no dudes en saludarme de nuevo, estaré pendiente a lo que necesites. ¡Hasta pronto! 😀 🙌" })

      }
      break;
    case "menu":
      if (dialog.level < 3) {
        pDialog = Object.assign(dialog, { activity: "Registration", step: dialog.step, answer: { answer: "Todavía no puedes usar el menu hasta que termines el registro. Para poder acceder al menu continuemos el registro de tu información y así poder plantar esta semilla en el mapa de sembrando Vida. ¿Continuamos? 🌳👩‍🌾 \n\n **Quedamos en este paso antes de que me pidieras ir al menú:**", message: `${check("Registration", dialog.step - 1)[0].answer}`, time: 3000, image: "" } });
      } else if (dialog.level >= 3) {
        pDialog = Object.assign(dialog, { activity: "Menu", step: 0, answer: "*¡Hola!*  🌳👩‍🌾\n\n *Te puedo ayudar con* \n\n_*¿Registrar* algo que tienes para intercambiar?_\n_*¿Anunciar* algo que necesitas?_\n_*¿Subir un documento* a nuestra biblioteca digital?_\n_*Ir al mapa* de Sembrando Vida_\n\n Espero poderte ayudar en lo que necesites 😀💚" })
      }
      break;
    case "saludo":
      if (dialog.step < 5 && dialog.level < 3) {
        console.log("\n\n dialog.intent[0] \n\n", dialog)
        pDialog = Object.assign(dialog, { activity: "Registration", nextStep: dialog.step, answer: { answer: `*¡Hola ${dialog.name && dialog.name.split(" ").length >= 4 ? dialog.name.split(" ").slice(0, 3).join(" ") : dialog.name.split(" ")[0]}!*  🌳👩‍🌾 \n Actualmente estamos en el registro de tu infomación \n `, message: `*Quedamos en esta parte de la conversación* \n\n ${check("Registration", dialog.step)[0].answer}`, time: 1000, image: "" } });

      } else if (dialog.step >= 5 && dialog.level < 3) {

        pDialog = Object.assign(dialog, { activity: "Detailed", nextStep: dialog.step + 1, answer: { answer: `*¡Hola ${dialog.name && dialog.name.split(" ").length >= 4 ? dialog.name.split(" ").slice(0, 3).join(" ") : dialog.name.split(" ")[0]}!*  🌳👩‍🌾 \n Actualmente estamos en el registro de tu infomación \n `, message: `*Quedamos en esta parte de la conversación* \n\n ${check("Detailed", dialog.step)[0].answer}`, time: 1000, image: "" } })

      } else if (dialog.level >= 3) {
        pDialog = Object.assign(dialog, { activity: "Registration", nextStep: dialog.step, answer: `*¡Hola, ${dialog.name.split(" ").length >= 4 ? dialog.name.split(" ").slice(0, 3).join(" ") : dialog.name.split(" ")[0]}!*  🌳👩‍🌾\n\n *Te puedo ayudar a* \n\n_*¿Registrar* algo que tienes para intercambiar?_\n_*¿Anunciar* algo que necesitas?_\n_*¿Subir un documento* a nuestra biblioteca digital?_\n_*Ir al mapa* de Sembrando Vida_\n\n Espero poderte ayudar en lo que necesites 😀💚` })
      } else if (dialog.intent === "Tengo" || dialog.intent === "Necesito" || dialog.intent === "Document") {

        pDialog = Object.assign(dialog, { nextStep: dialog.step, answer: `*¡Hola, ${dialog.name.split(" ").length >= 4 ? dialog.name.split(" ").slice(0, 3).join(" ") : dialog.name.split(" ")[0]}!*  🌳👩‍🌾\n\n Estamos en el curso de un registrp"} \n \n¿deseas *continuar* con este registro, ir al *Menu* o *Terminar* la conversación por el momento? 😀💚` })
      }
      break;
    default:
      break;
  }

  return pDialog;
}


options = async (dialog) => {
  dialogP = processedEntity(dialog)
  await userModify(register(dialogP), dialog.id);
  return dialogP.answer;
}



module.exports = options; 