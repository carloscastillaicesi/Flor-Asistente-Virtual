var { userModify } = require('../globalCRUD');
var { createDocument, documentModify, getDocument, userModify, getUser } = require('../globalCRUD');

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
  var document;

  switch (dialog.intent) {
    case "titulo":
      user = await getUser(dialog.id);
      // var itemId = user.currentItem
      // var d = await getDocument(itemId);
      // var searchTerm;
      // if (dialog.body.toLowerCase().includes("es")) {
      //   searchTerm = "es";
      // } else if (dialog.body.toLowerCase().includes("siguiente")) {
      //   searchTerm = "siguiente";
      // } else if (dialog.body.toLowerCase().includes(":")) {
      //   searchTerm = ":";
      // }

      // const indexOfFirst = dialog.body.indexOf(searchTerm) + searchTerm.length;
      // var name = toTitleCase(dialog.body).slice(indexOfFirst + 1, dialog.body.length)
      documents = Object.assign(d, { nombre: dialog.body })
      await documentModify(documents, itemId);
      pDialog = Object.assign(dialog, { activity: "Menu", step: 0, currentItem: "" })
      await userModify(register(pDialog), dialog.id);
      finishDialog = Object.assign(dialog, { answer: `*Genial*  🙌✨  El documento ya está en la biblioteca digital de sembrando vida nuestra biblioteca digital, si quieres puedes entrar al siguiente Link y verlo \n\n En el siguiente link puedes verlo: \n\n  ${process.env.NGROK}/menu/library/${d.categorias[0]} \n\n\n*Cuentame, en qué más te puedo ayudar hoy*\n\n_*¿Registrar* algo que tienes para intercambiar?_\n_*¿Anunciar* algo que necesitas?_\n_*¿Subir un documento* a nuestra biblioteca digital?_\n_*¿Ir al mapa* de Sembrando Vida_\n\nEspero poderte ayudar en lo que necesites 😀💚` })
      document = finishDialog;
      break;
    case "url":
      var d = await createDocument(dialog.id, dialog.body);
      document = Object.assign(dialog, { currentItem: d._id })
      user = await userModify(register(document), dialog.id);
      document = dialog;
      break;
    case "descripcion":
      user = await userModify(register(dialog), dialog.id);
      var itemId = user[Object.keys(user)[0]].currentItem
      d = await getDocument(itemId);
      documents = Object.assign(d, { descripcion: dialog.body })
      await documentModify(documents, itemId);
      document = dialog;
      break;

    case "categorias":
      user = await userModify(register(dialog), dialog.id);
      var itemId = user[Object.keys(user)[0]].currentItem
      d = await getDocument(itemId);
      var searchTerm;
      if (dialog.body.toLowerCase().includes("categoria")) {
        searchTerm = "categoria";
      } else if (dialog.body.toLowerCase().includes("categoría")) {
        searchTerm = "categoría";
      } else if (dialog.body.toLowerCase().includes("pertenece a")) {
        searchTerm = "pertenece a";
      } else if (dialog.body.toLowerCase().includes("de")) {
        searchTerm = "de";
      } else if (dialog.body.toLowerCase().includes(":")) {
        searchTerm = ":";
      }

      const indexOfCategoria = dialog.body.indexOf(searchTerm) + searchTerm.length;
      var categoria = toTitleCase(dialog.body).slice(indexOfCategoria + 1, dialog.body.length)
      var categorias = categoria.split(",")
      categorias = categoria.split(" ")
      documents = Object.assign(d, { categorias: categorias })
      documented = await documentModify(documents, itemId);
      document = dialog;
      break;

    default:
      await userModify(register(dialog), dialog.id);
      var d = await createDocument(dialog.id, dialog.body);
      finishDialog = Object.assign(dialog, { answer: `*Genial*  🙌✨  El documento ya está en la biblioteca digital de sembrando vida nuestra biblioteca digital, si quieres puedes entrar al siguiente Link y verlo \n\n En el siguiente link puedes verlo: \n\n ${process.env.NGROK}/menu/library/${d.categorias[0]} \n\n\n*Cuentame, en qué más te puedo ayudar hoy*\n\n_*¿Registrar* algo que tienes para intercambiar?_\n_*¿Anunciar* algo que necesitas?_\n_*¿Subir un documento* a nuestra biblioteca digital?_\n_*¿Ir al mapa* de Sembrando Vida_\n\nEspero poderte ayudar en lo que necesites 😀💚` })
      document = finishDialog;
      document = dialog
      break;
  }

  return document;
}

const toTitleCase = (phrase) => {
  return phrase
    .toLowerCase()
    .replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '')
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};


documento = async (dialog) => {
  console.log("entro a tengo Documentooo")
  d = await processedEntity(dialog);
  return d.answer;
}



module.exports = documento;