const { dockStart } = require('@nlpjs/basic');
const { StemmerEs, StopwordsEs } = require('@nlpjs/lang-es');
// can be used for context
const { ConversationContext } = require('node-nlp');
const fs = require('fs');
var json = require('../corpus.json');
var flatten = require('flat')
const stemmer = new StemmerEs();
const stopwords = new StopwordsEs();
const context = new ConversationContext();

function body(input) {
  let body = input;
  if (input.messageType === "noMedia") {
    body = stemmer.tokenizeAndStem(body, false);
    body = stopwords.removeStopwords(body);
    body = body.join(' ');
    return body;
  } else if (input.messageType.includes("_text")) {
    body = stemmer.tokenizeAndStem(body, false);
    body = stopwords.removeStopwords(body);
    body = body.join(' ');
    return body;
  } else {
    body = input.messageType;
    return body;
  }

}

var main = async (input) => {

  let body = body(input.body);

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

  console.log(context);
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

  var obj = { ...response.answers };
  for (const key in obj) {
    if (obj[key].hasOwnProperty('opts')) {
      delete obj[key].opts;
    }
  }

  let target = {
    "intent": response.intent,
    "score": response.score,
    "entities": response.entities
  }
  target = Object.assign(flatten(obj), target)
  const newMssg_nlp = Object.assign(input, target)
  return newMssg_nlp;
};




module.exports = main; 