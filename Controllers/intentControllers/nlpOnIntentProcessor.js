const userModel = require('../../Models/userModel');
const userLocal = require('../UserLocalCRUD');

saludo = (processed, fn) => {

  var data = userLocal.dataObject(processed.number);
  console.log(Object.keys(data));
  return processed;
};

nombre = (processed, fn) => {
  var data = userLocal.updateData(processed.number, 2, fn, "carlos");
  console.log("\n Inside Nombre: \n");
  console.log(data);
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

  // let target = {
  //   "answer": "no te entendí amigue",
  // };

  // const newMssg_Intent = Object.assign(processed, target);

  return processed;
};



intentClassifier = (fun) => {

  var fn = fun.intent.toString().trim().toLowerCase();

  // function exists
  if (fn in global && typeof global[fn] === "function") {
    return global[fn](fun, fn);
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