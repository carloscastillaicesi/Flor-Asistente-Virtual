const User = require('../../Models/userModel');
var userLocal = require('../localCRUD');
const intentSaludo = require('./intentSaludo');

saludo = (processed, fn) => {
  return intentSaludo(processed, fn);
};

nombre = async (processed, fn) => {
  var data = userLocal.dataObject(processed.number);
  try {
    var response = await User.findOneAndUpdate(data.id, { step: 2, stage: fn, name: 'Daniel Manso' });
    console.log(JSON.stringify(response));
    var localUser = userLocal.updateData(response.id, response.step, response.stage, response.name);
    console.log(`Local User = ${localUser} & Mongo User : ${response._id} `)
  } catch (error) {
    console.log(error.message);
  }

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

none = (processed) => {

  return processed;
};



intentClassifier = (fun) => {

  var fn = fun.intent.toString().trim().toLowerCase();

  // function exists
  if (fn in global && typeof global[fn] === "function") {
    return global[fn](fun, fn);
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