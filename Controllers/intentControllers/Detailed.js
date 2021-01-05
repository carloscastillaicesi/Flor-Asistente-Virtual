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
    case "ubicacionHuerta":
      d = await getDetails(dialog.id);
      details = Object.assign(d, { ubicacionHuerta: dialog.body })
      await detailModify(details, dialog.id);
      await userModify(register(dialog), dialog.id);
      break;
    case "image":
      d = await getDetails(dialog.id);
      var galeria = [...d.gallery]
      galeria.push(dialog.body)
      details = Object.assign(d, { gallery: galeria })
      await detailModify(details, dialog.id);
      await userModify(register(dialog), dialog.id);
      break;
    case "encargadosHuerta":
      d = await getDetails(dialog.id);
      details = Object.assign(d, { encargadosHuerta: dialog.body })
      await detailModify(details, dialog.id);
      await userModify(register(dialog), dialog.id);
      break;
    case "tiempoDedicadoHuerta":
      d = await getDetails(dialog.id);
      details = Object.assign(d, { tiempoDedicadoHuerta: dialog.body })
      await detailModify(details, dialog.id);
      await userModify(register(dialog), dialog.id);
      break;
    case "tiempoExperiencia":
      d = await getDetails(dialog.id);
      details = Object.assign(d, { tiempoExperiencia: dialog.body })
      await detailModify(details, dialog.id);
      await userModify(register(dialog), dialog.id);
      break;
    case "conocimiento":
      d = await getDetails(dialog.id);
      details = Object.assign(d, { conocimiento: dialog.body })
      await detailModify(details, dialog.id);
      await userModify(register(dialog), dialog.id);
      break;
    case "beneficiosSalud":
      d = await getDetails(dialog.id);
      details = Object.assign(d, { beneficiosSalud: dialog.body })
      await detailModify(details, dialog.id);
      await userModify(register(dialog), dialog.id);
      break;
    case "expectativaHuerta":
      d = await getDetails(dialog.id);
      details = Object.assign(d, { expectativaHuerta: dialog.body })
      await detailModify(details, dialog.id);
      pDialog = Object.assign(dialog, { activity: "Menu" })
      await userModify(register(pDialog), dialog.id);
      break;
    default:
      await userModify(register(dialog), dialog.id);
      break;
  }
  return details;
}

function customAnswer(dialog) {
  var answer;
  console.log("dialog.uEntity", dialog.uEntity);
  if (dialog.uEntity.includes("{link}")) {
    answer = dialog.answer;
    answer = { answer: answer.replace("{link}", `https://aefd1c3b5181.ngrok.io/user/${dialog.id}`), message: " *¿Quieres continuar con el registro?* 🙈 💚🌱esto ayudar a que crezca tu semilla. Recuerda que para que nuestra semilla crezca hay que cuidarla y fortalecerla con nuestra información", time: 10000, image: "https://i.ibb.co/N93mzML/etapa1.png" };

  } else if (dialog.uEntity.includes("{link2}")) {
    answer = dialog.answer;
    answer = {
      answer: answer.replace("{link2}", `https://aefd1c3b5181.ngrok.io/user/${dialog.id}`), message: "😊💚 *¿Quieres continuar con el registro?* esto ayudará a crecer tu germinado. Recuerda que para que nuestra planta crezca hay que cuidarla, no queremos que pase algo malo.", time: 10000, image: "https://i.ibb.co/zHFVhZ6/etapa2.png"
    };
  } else if (dialog.uEntity.includes("{link3}")) {
    answer = dialog.answer;
    answer = {
      answer: answer.replace("{link3}", `https://aefd1c3b5181.ngrok.io/user/${dialog.id}`), message: "Genial,  ya terminaste con tu registro puede ahora subir documentos y hacer intercambios. Por lo tanto, te puedo ayudar si\n\n_*¿Buscas* algo para intercambiar?_\n_*¿Registrar* algo que tienes para intercambiar?_\n_¿*Anunciar* algo que necesitas?_\n_*¿Subir un documento* a nuestra biblioteca digital?_\n_*¿Buscar un documento* en nuestra biblioteca digital?_\n_*¿Modificar* información de tu perfil?_\n\n Espero poderte ayudar en lo que necesites 😀💚", time: 10000, image: "https://i.ibb.co/MVb1X1C/etapa3.png"
    };

  } else {
    answer = dialog.answer;
  }
  return answer;
}

detailed = async (dialog) => {
  await processedEntity(dialog);
  return customAnswer(dialog);
}


module.exports = detailed; 