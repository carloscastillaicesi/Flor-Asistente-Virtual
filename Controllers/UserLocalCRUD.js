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

dataObject = (id) => {
 var desiredObject;
 try {
  desiredObject = file.users.filter((users) => { return decrypt(Object.keys(users)[0]) === decrypt(id); })[0];
  if (desiredObject) {
   console.log("\n User Found \n");
   desiredObject = desiredObject;
  } else {
   console.log("\n Creating new User \n");
   desiredObject = createUser(id);
  }
 } catch (error) {
  desiredObject = "";
 }

 return desiredObject;
};

existsData = (id) => {
 try {
  desiredObject = file.users.filter((users) => { return decrypt(Object.keys(users)[0]) === decrypt(id); })[0];
  return desiredObject ? true : false
 } catch (error) {
  return desiredObject = null;
 }

}

getData = (id, desiredKey) => {
 try {
  var desiredObject = dataObject(id)
  var desiredKey = desiredKey.toString();
  if (desiredObject) {
   var currentKey = Object.keys(desiredObject)[0];
   console.log("\n Changin User: \n");
   console.log(`Id: ${Object.keys(desiredObject)[0]}`);
   return desiredObject[currentKey].desiredKey;
  } else {
   return "No such user";
  }
 } catch (error) {
  return desiredObject = null;
 }

}

updateData = (id, step, stage, name) => {
 try {
  var desiredObject = dataObject(id)
  if (desiredObject) {
   var currentKey = Object.keys(desiredObject)[0];
   console.log("\n Changing Users data \n");
   console.log(`Id: ${Object.keys(desiredObject)[0]}`);
   file.users[0][currentKey].stage = stage;
   file.users[0][currentKey].step = step;
   file.users[0][currentKey].name = name;
   fs.writeFile('userStage.json', JSON.stringify(file, null, 2), function (err, content) {
    if (err) throw err;
   })
   return desiredObject;
  } else {
   return "No such user";
  }
 } catch (error) {
  return desiredObject = null;
 }
}

/**
 */
createUser = (id) => {
 return writeData(new User(id, 1, "registro", ""));
}

writeData = (data) => {
 fs.readFile('userStage.json', function (err, content) {
  if (err) throw err;
  var parseJson = JSON.parse(content);
  parseJson.users.push(data);
  fs.writeFile('userStage.json', JSON.stringify(parseJson, null, 2), function (err) {
   if (err) throw err;
  })
 })
 return data;
};

module.exports = { dataObject, existsData, writeData, updateData };



