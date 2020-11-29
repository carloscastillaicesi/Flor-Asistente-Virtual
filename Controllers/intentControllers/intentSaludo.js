var { userC } = require('../userMessageController');


saludo = (processed, fn) => {

 let target = {
  "answer": "¡Hola! Ya he guardado tu número, pero no tengo tu nombre. Me lo podrías decir, porfavor",
 };

 Object.assign(processed, target);
 return processed;
}


module.exports = saludo; 