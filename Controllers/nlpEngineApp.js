const { dockStart } = require('@nlpjs/basic');
// can be used for context
const { ConversationContext } = require('node-nlp');
var json = require('../corpus.json');


var main = async (input) => {
  let body = input.body;
  const context = new ConversationContext();
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
  let target = {
    "answer": response.answer,
    "intent": response.intent,
    "score": response.score,
    "entities": response.entities
  }
  const newMssg_nlp = Object.assign(input, target)
  return newMssg_nlp;
};



module.exports = main; 