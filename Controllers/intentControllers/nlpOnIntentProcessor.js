const User = require('../../Models/userModel');
var userLocal = require('../localCRUD');
const intentSaludo = require('./intentSaludo');

saludo = (dialog) => {
  return intentSaludo(dialog);
};

nombre = (processed, fn) => {

  return processed;
  // let target = {
  //   "answer": "¡Hola! Ya he guardado tu número, pero no tengo tu nombre. Me lo podrías decir, porfavor",
  // };
  // Object.assign(processed, target);
}


foto = (processed) => {

};


edad = (processed) => {

};

ubicacion = (processed) => {

};


tieneHuerta = (processed) => {

};

despedida = (processed) => {

};

mapa = (processed) => {

};

none = (dialog) => {
  var response;
  switch (dialog.activity) {

    case "Registration":
      switch (dialog.step) {
        case 0:
          response = "No se tu nombre, porfavor damelo."
          break;

        default:
          break;
      }
      break;

    default:
      break;
  }


  return response;
};



error = (dialog) => {
  var response;
  switch (dialog.activity) {

    case "Registration":
      switch (dialog.step) {
        case 0:
          response = "No se tu nombre, porfavor damelo."
          break;

        default:
          break;
      }
      break;

    default:
      break;
  }


  return response;
};



intentClassifier = (dialog) => {

  var fn = dialog.intent.toString().trim().toLowerCase();

  // function exists
  if (fn in global && typeof global[fn] === "function") {
    return global[fn](dialog);
  }

  else {
    console.log("could not find " + fn + " function");
  }
};

module.exports = {
  intentClassifier,
  foto,
  saludo,
  nombre,
  foto,
  edad,
  ubicacion,
  tieneHuerta,
  despedida,
  mapa
};  