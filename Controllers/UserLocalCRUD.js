var fs = require("fs");
const { search } = require("../Routes/inboundRouter");
var fileData = fs.readFileSync('userStage.json');
var file = JSON.parse(fileData);
const { encrypt, decrypt } = require('./crypto');
/**
 * cleans the incoming Twilio Message object, just getting what i want.
 * Using property value shorthand
 * @constructor
 * @params id - number passed in the Twilio Message Object
 * @params stage - number passed in the Twilio Message Object
 * @params registered - number passed in the Twilio Message Object
 * This is called a constructor Function
*/

function User(id, step, stage, name) { return { [id]: { "step": step, "stage": stage, "name": name } } };

/**
 */

searchData = (id) => {
 var desiredObject;
 try {
  desiredObject = file.users.filter((users) => { return decrypt(Object.keys(users)[0]) === decrypt(id); })[0];
  if (desiredObject) {
   console.log("\n hola \n");
   console.log(desiredObject);
   desiredObject = desiredObject;
  } else {
   console.log("\n hole \n");
   desiredObject = createUser(id);
  }
 } catch (error) {
  desiredObject = "";
 }

 return desiredObject;
};

createUser = (id) => {
 return writeData(new User(id, 1, "registro", ""));
}

updateData = (id, step, stage, name) => {
 var desiredObject = searchData(id, step, stage, name);
}

/**
 */
writeData = (data) => {

 fs.readFile('userStage.json', function (err, content) {
  if (err) throw err;
  var parseJson = JSON.parse(content);
  parseJson.users.push(data)
  fs.writeFile('userStage.json', JSON.stringify(parseJson, null, 2), function (err) {
   if (err) throw err;
  })
  return data;
 })
};


module.exports = { searchData, writeData };



