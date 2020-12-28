const { dockStart } = require('@nlpjs/basic');
const { StemmerEs, StopwordsEs } = require('@nlpjs/lang-es');
// can be used for context
const { ConversationContext } = require('node-nlp');
const fs = require('fs');
var json = require('../corpus.json');

const stemmer = new StemmerEs();
const stopwords = new StopwordsEs();
const context = new ConversationContext();



var main = async (input) => {

  let body = input.body;

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

  console.log("body", body);
  const response = await nlp.process('es', body, context);
  console.log("response", response);
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
  var answers = [];
  var obj = { ...response.answers };
  for (const key in obj) {
    if (obj[key].hasOwnProperty('opts')) {
      delete obj[key].opts;
      answers.push(obj[key].answer);
    }
  }


  let target = {
    "intent": response.intent,
    "score": response.score,
    "entities": response.entities,
    "answers": answers,
  }

  const newMssg_nlp = Object.assign(input, target)
  return newMssg_nlp;
};




module.exports = main; 