var fs = require("fs");
const { search } = require("../Routes/inboundRouter");
var fileData = fs.readFileSync('userStage.json');
var file = JSON.parse(fileData);
const { decrypt } = require('./crypto');

/**
 * Creates a
 * Using property value shorthand
 * @constructor
 * @params id - number passed in the Twilio Message Object
 * @params stage - number passed in the Twilio Message Object
 * @params registered - number passed in the Twilio Message Object
 * This is called a constructor Function
*/

function User(id, currentActivity, currentStep, registered, name) { return { [id]: { "currentActivity": currentActivity, "currentStep": currentStep, "registered": registered, "name": name } } };

/**
 */
dataObject = (id) => {
 var desiredObject;
 try {
  if (Object.keys(file.users).length > 0) {
   desiredObject = file.users.filter((users) => { return decrypt(Object.keys(users)[0]) === decrypt(id); })[0];
   if (desiredObject) {
    console.log("\n User Found !!! \n");
    var currentKey = Object.keys(desiredObject)[0];
    console.log("\n Getting Data...\n");
    var user = {
     id: Object.keys(desiredObject)[0],
     currentActivity: desiredObject[currentKey].currentActivity,
     currentStep: desiredObject[currentKey].currentStep,
     registered: desiredObject[currentKey].registered,
     name: desiredObject[currentKey].name
    }
    desiredObject = user;
   } else {
    console.log(`\n User not found...Create a new user with id: ${id}\n`);
    desiredObject = id;
   }
  } else {
   console.log(`\n There are no users in the local collection....Create a new user with id: ${id}\n`);
   desiredObject = id;
  }
 } catch (error) {
  desiredObject = error.message;
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

updateData = (id, step, stage, name) => {
 try {
  var desiredObject = dataObject(id)
  if (desiredObject) {
   var currentKey = desiredObject.id;
   console.log("\n Changing Users data \n");
   console.log(`Id: ${Object.keys(desiredObject)[0]}`);
   file.users[0][currentKey].stage = stage;
   file.users[0][currentKey].step = step;
   file.users[0][currentKey].name = name;
   fs.writeFile('userStage.json', JSON.stringify(file, null, 2), function (err, content) {
    if (err) throw err;
    console.log(content);
   })
   return currentKey;
  } else {
   return "No such user";
  }
 } catch (error) {
  return desiredObject = null;
 }
}

/**
 */
function createUser(id, currentActivity, currentStep, registered, name) {
 return new Promise(function (resolve, reject) {
  fs.readFile('userStage.json', function (err, content) {
   if (err) throw err;
   var parseJson = JSON.parse(content);
   let data = new User(id, currentActivity, currentStep, registered, name);
   parseJson.users.push(data);
   fs.writeFile('userStage.json', JSON.stringify(parseJson, null, 2), function (err) {
    if (err) {
     reject(err);
    } else {
     resolve(data);
    }
   })
  })
 })
};

/** Changing json key 
 * function renameKey(obj, oldKey, newKey) {
  obj[newKey] = obj[oldKey];
  delete obj[oldKey];
}
 */
module.exports = { dataObject, existsData, createUser, updateData };



