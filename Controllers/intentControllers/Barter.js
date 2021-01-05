var { userModify } = require('../globalCRUD');
var { createBarter, barterModify, getBarter, userModify, getUser } = require('../globalCRUD');

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
      else if (dialog.body.toLowerCase().includes("tengo")) {
        searchTerm = "poner";
      } else if (dialog.body.toLowerCase().includes("necesito")) {
        searchTerm = "poner";
      } else if (dialog.body.toLowerCase().includes("busco")) {
        searchTerm = "poner";
      } else if (dialog.body.toLowerCase().includes("ofrezco")) {
        searchTerm = "poner";
      }
      const indexOfFirst = dialog.body.indexOf(searchTerm) + searchTerm.length;
      var name = toTitleCase(dialog.body).slice(indexOfFirst + 1, dialog.body.length)

      if (dialog.activity === "Tengo") {
        b = await createBarter(dialog.id, 0, name);
      } else if (dialog.activity === "Necesito") {
        b = await createBarter(dialog.id, 1, name);
      }

      var answer = dialog.answer;
      answer = answer.replace(dialog.uEntity, name);
      barter = Object.assign(dialog, { answer: answer, currentItem: b._id })
      await userModify(register(barter), dialog.id);
      barter = dialog;
      break;
    case "image":
      user = await userModify(register(dialog), dialog.id);
      var itemId = user[Object.keys(user)[0]].currentItem
      b = await getBarter(itemId);
      var galeria = [...b.fotos]
      galeria.push(dialog.body)
      barters = Object.assign(b, { fotos: galeria })
      await barterModify(barters, itemId);
      barter = dialog;
      break;
    case "descripcion":
      user = await userModify(register(dialog), dialog.id);
      var itemId = user[Object.keys(user)[0]].currentItem
      b = await getBarter(itemId);
      barters = Object.assign(b, { descripcion: dialog.body })
      await barterModify(barters, itemId);
      barter = dialog;
      break;
    case "cambio":
      user = await getUser(dialog.id);
      var itemId = user.currentItem
      b = await getBarter(itemId);
      barters = Object.assign(b, { cambio: dialog.body })
      await barterModify(barters, itemId);
      pDialog = Object.assign(dialog, { activity: "Menu", step: 0, currentItem: "" })
      await userModify(register(pDialog), dialog.id);
      finishDialog = Object.assign(dialog, { answer: `¡Genial!  ya terminaste con el registro de tu intercambio \n\n En el siguiente link puedes verlo: \n\n https://203a227a4379.ngrok.io/menu/exchange/${b.tipo === 1 ? "need/user" : "got"}/${dialog.id} \n\n\n*Cuentame, en qué más te puedo ayudar hoy* \n\n_*¿Buscas* algo para intercambiar?_\n_*¿Registrar* algo que tienes para intercambiar?_\n_¿*Anunciar* algo que necesitas?_\n_*¿Subir un documento* a nuestra biblioteca digital?_\n_*¿Buscar un documento* en nuestra biblioteca digital?_\n_*¿Modificar* información de tu perfil?_\n\n Espero poderte ayudar en lo que necesites 😀💚` })
      barter = finishDialog;
      break;

    case "categorias":
      user = await userModify(register(dialog), dialog.id);
      var itemId = user[Object.keys(user)[0]].currentItem
      b = await getBarter(itemId);
      var searchTerm;
      if (dialog.body.toLowerCase().includes("categoria")) {
        searchTerm = "categoria";
      } else if (dialog.body.toLowerCase().includes("categoría")) {
        searchTerm = "categoría";
      } else if (dialog.body.toLowerCase().includes("pertenece a")) {
        searchTerm = "pertenece a";
      } else if (dialog.body.toLowerCase().includes("de")) {
        searchTerm = "de";
      }

      const indexOfCategoria = dialog.body.indexOf(searchTerm) + searchTerm.length;
      var categoria = toTitleCase(dialog.body).slice(indexOfCategoria + 1, dialog.body.length)
      var categorias = categoria.split(",")
      categorias = categoria.split(" ")
      barters = Object.assign(b, { categorias: categorias })
      bartered = await barterModify(barters, itemId);
      barter = dialog;
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


barter = async (dialog) => {
  console.log("entro a tengo Tengooo")
  b = await processedEntity(dialog);
  return b.answer;
}



module.exports = barter; 