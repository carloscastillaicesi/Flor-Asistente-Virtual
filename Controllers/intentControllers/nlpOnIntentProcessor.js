const userModel = require('../../Models/userModel');
const userLocal = require('../UserLocalCRUD');

saludo = (processed) => {
  return processed;
};

nombre = (processed) => {
  return processed;
};


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

mapa = (processed) => {

};

none = (processed) => {

  let target = {
    "answer": "no te entendí amigue",
  };

  const newMssg_Intent = Object.assign(processed, target);

  return newMssg_Intent;
};



intentClassifier = (fun) => {

  var fn = fun.intent.toString().trim().toLowerCase();

  // function exists
  if (fn in global && typeof global[fn] === "function") {
    return global[fn](fun);
  }

  // function does not exist
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