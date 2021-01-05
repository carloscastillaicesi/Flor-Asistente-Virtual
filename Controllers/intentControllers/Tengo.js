var { userModify } = require('../globalCRUD');
var { createBarter, barterModify, getBarter, userModify } = require('../globalCRUD');

/**
 * Creates a
 * Using property value shorthand
 * @constructor
 * @params id - number passed in the Twilio Message Object
 * @params stage - number passed in the Twilio Message Object
 * @params registered - number passed in the Twilio Message Object
 * This is called a constructor Function
*/

function register({ geometry, activity, nextStep, level, name, pic, currentItem }) {
  return { geometry: geometry ? geometry : [], activity: activity, step: nextStep, level: level, name: name ? name : "", pic: pic ? pic : "", currentItem: currentItem ? currentItem : "" };
}


async function processedEntity(dialog) {
  var barter;

  switch (dialog.intent) {
    case "name":
      var searchTerm;
      if (dialog.body.toLowerCase().includes("es")) {
        searchTerm = "es";
      } else if (dialog.body.toLowerCase().includes("llama")) {
        searchTerm = "llama";
      } else if (dialog.body.toLowerCase().includes("soy")) {
        searchTerm = "soy ";
      } else if (dialog.body.toLowerCase().includes("como")) {
        searchTerm = "como";
      } else if (dialog.body.toLowerCase().includes("poner")) {
        searchTerm = "poner";
      } else if (dialog.body.toLowerCase().includes("le pondre")) { searchTerm = "pondre"; }
      const indexOfFirst = dialog.body.indexOf(searchTerm) + searchTerm.length;
      var name = toTitleCase(dialog.body).slice(indexOfFirst + 1, dialog.body.length)
      b = await createBarter(dialog.id, 0, name);
      var answer = dialog.answer;
      answer = answer.replace(dialog.uEntity, name);
      barter = Object.assign(dialog, { answer: answer, currentItem: b._id })
      await userModify(register(barter), dialog.id);
      console.log("Tengo B", b);

      break;
    case "image":
      b = await getBarter(dialog.id);
      var galeria = [...b.fotos]
      galeria.push(dialog.body)
      barters = Object.assign(d, { fotos: galeria })
      await barterModify(barters, dialog.id);
      await userModify(register(dialog), dialog.id);
      break;
    case "descripcion":
      b = await getBarter(dialog.id);
      barters = Object.assign(b, { descripcion: dialog.body })
      await barterModify(barters, dialog.id);
      await userModify(register(dialog), dialog.id);
      break;
    case "cambio":
      b = await getBarter(dialog.id);
      barters = Object.assign(b, { cambio: dialog.body })
      await barterModify(barters, dialog.id);
      await userModify(register(dialog), dialog.id);
      break;
    case "categorias":
      var searchTerm;
      if (dialog.body.toLowerCase().includes("categoria")) {
        searchTerm = "categoria";
      } else if (dialog.body.toLowerCase().includes("categoría")) {
        searchTerm = "categoría";
      }
      const indexOfFirst = dialog.body.indexOf(searchTerm) + searchTerm.length;
      var categoria = toTitleCase(dialog.body).slice(indexOfFirst + 1, dialog.body.length)
      b = await getBarter(dialog.id);
      barters = Object.assign(b, { categorias: categoria.split(",") })
      await barterModify(barters, dialog.id);
      await userModify(register(dialog), dialog.id);
      break;


    default:
      await userModify(register(dialog), dialog.id);
      barter = dialog
      break;
  }
  return barter;
}

const toTitleCase = (phrase) => {
  return phrase
    .toLowerCase()
    .replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '')
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};



tengo = async (dialog) => {
  b = await processedEntity(dialog);
  return b.answer;
}



module.exports = tengo; 