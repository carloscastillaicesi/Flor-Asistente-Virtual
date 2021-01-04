const { dockStart } = require('@nlpjs/basic');
// can be used for context
const { ConversationContext } = require('node-nlp');
const fs = require('fs');
var json = require('../corpus.json');

const context = new ConversationContext();



var main = async (input) => {

  let body = input.messageType === "noMedia" ? input.body.replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '') : input.messageType;
  body = body.toLowerCase();
  const dock = await dockStart({
    "settings": {
      "nlp": {
        "corpora": [
          json
        ],
        "nlu": { "log": false }
      }
    },
    "use": ["Basic"]
  });
  const nlp = dock.get('nlp');
  await nlp.train();

  const response = await nlp.process('es', body, context);

  /**
   * Assigning some properties of @constant response to the incoming @param input to append just some of the objects propeties: 
   * @property {string} answer - suggested answer that nlp.js sends
   * @property {string} intent - suggested intent that nlp.js interpreted given a certain utterance
   * @property {string} score -  certainty expresed in percentage of how accurate the intent clasiffication is (<0.5 is not recommended, ask user to clarify)
   * @property {string} entities - contains the recognized entities by NER
  */
  /** Excluding key and flattening it with this module 
   * https://github.com/hughsk/flat
   */
  // var answers = [];

  // var obj = { ...response.answers };
  // for (const key in obj) {
  //   if (obj[key].hasOwnProperty('opts')) {
  //     delete obj[key].opts;
  //     answers.push(obj[key].answer);
  //   }
  // }

  var entities = [];

  for (let i = 0; i < response.entities.length; i++) {
    const { levenshtein, type, utteranceText, accuracy, len, start, ...entity } = response.entities[i];
    entities.push(entity);
  }

  let target = {
    "intent": response.intent,
    "score": response.score,
  }

  const newMssg_nlp = Object.assign(input, target)
  return newMssg_nlp;
};




module.exports = main; 