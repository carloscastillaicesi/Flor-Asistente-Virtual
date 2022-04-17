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

function changeNone(dialog) {
  var intentR

  switch (dialog.step) {
    case 6:
      intentR = "ubicacionHuerta"
      break;
    case 10:
      intentR = "encargadosHuerta"
      break;
    case 11:
      intentR = "tiempoDedicadoHuerta"
      break;
    case 13:
      intentR = "tiempoExperiencia"
      break;
    case 14:
      intentR = "conocimiento"
      break;
    case 15:
      intentR = "beneficiosSalud"
      break;
    case 16:
      intentR = "expectativaHuerta"
      break;
    default:
      intentR = dialog.intent;
      break;
  }

  return Object.assign(dialog, { intent: intentR });
}


async function processedEntity(dialog) {
  dialogNew = changeNone(dialog);
  var details;
  switch (dialogNew.intent) {
    case "ubicacionHuerta":
      d = await getDetails(dialogNew.id);
      details = Object.assign(d, { ubicacionHuerta: d.ubicacionHuerta ? `${d.ubicacionHuerta} - ${dialogNew.body}` : dialogNew.body });
      await detailModify(details, dialogNew.id);
      await userModify(register(dialogNew), dialogNew.id);
      break;
    case "image":
      d = await getDetails(dialogNew.id);
      var galeria = [...d.gallery]
      galeria.push(dialogNew.body)
      details = Object.assign(d, { gallery: galeria })
      await detailModify(details, dialogNew.id);
      await userModify(register(dialogNew), dialogNew.id);
      break;
    case "encargadosHuerta":
      d = await getDetails(dialogNew.id);
      details = Object.assign(d, { encargadosHuerta: dialogNew.body })
      await detailModify(details, dialogNew.id);
      await userModify(register(dialogNew), dialogNew.id);
      break;
    case "tiempoDedicadoHuerta":
      d = await getDetails(dialogNew.id);
      details = Object.assign(d, { tiempoDedicadoHuerta: dialogNew.body })
      await detailModify(details, dialogNew.id);
      await userModify(register(dialogNew), dialogNew.id);
      break;
    case "tiempoExperiencia":
      d = await getDetails(dialogNew.id);
      details = Object.assign(d, { tiempoExperiencia: dialogNew.body })
      await detailModify(details, dialogNew.id);
      await userModify(register(dialogNew), dialogNew.id);
      break;
    case "conocimiento":
      d = await getDetails(dialogNew.id);
      details = Object.assign(d, { conocimiento: dialogNew.body })
      await detailModify(details, dialogNew.id);
      await userModify(register(dialogNew), dialogNew.id);
      break;
    case "beneficiosSalud":
      d = await getDetails(dialogNew.id);
      details = Object.assign(d, { beneficiosSalud: dialogNew.body })
      await detailModify(details, dialogNew.id);
      await userModify(register(dialogNew), dialogNew.id);
      break;
    case "expectativaHuerta":
      d = await getDetails(dialogNew.id);
      details = Object.assign(d, { expectativaHuerta: dialogNew.body })
      await detailModify(details, dialogNew.id);
      pdialogNew = Object.assign(dialogNew, { activity: "Menu", step: 0 })
      await userModify(register(pdialogNew), dialogNew.id);
      break;
    default:
      await userModify(register(dialogNew), dialogNew.id);
      break;
  }
  return details;
}

function customAnswer(dialog) {
  var answer;
  console.log("dialog.uEntity", dialog.uEntity);
  if (dialog.uEntity.includes("{link}")) {
    answer = dialog.answer;
    answer = {
      answer: answer.replace("{link}", `${process.env.NGROK}/user/${dialog.id}`), message: " ¿Quieres continuar con el registro? 🙈 💚🌱Esto ayudará a que tu semilla germine", time: 10000, image: "https://i.ibb.co/N93mzML/etapa1.png"
    };

  } else if (dialog.uEntity.includes("{link2}")) {
    answer = dialog.answer;
    answer = {
      answer: answer.replace("{link2}", `${process.env.NGROK}/user/${dialog.id}`), message: "😊💚 *¿Quieres continuar con el registro?* esto ayudará a crecer tu germinado. Recuerda que para que nuestra planta crezca hay que cuidarla, no queremos que pase algo malo.", time: 10000, image: "https://i.ibb.co/zHFVhZ6/etapa2.png"
    };
  } else if (dialog.uEntity.includes("{link3}")) {
    answer = dialog.answer;
    answer = {
      answer: answer.replace("{link3}", `${process.env.NGROK}/user/${dialog.id}`), message: "Genial,  ya terminaste el registro de tu información. Por lo tanto, te puedo ayudar si quieres\n\n_*¿Registrar* algo que tienes para intercambiar?_\n_*¿Anunciar* algo que necesitas?_\n_*¿Subir un documento* a nuestra biblioteca digital?_\n_*¿Ir al mapa* de Sembrando Vida_\n\nEspero poderte ayudar en lo que necesites 😀💚", time: 10000, image: "https://i.ibb.co/MVb1X1C/etapa3.png"
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