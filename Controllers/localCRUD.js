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

function User(id, obj) {
  return { [id]: { ...obj } };
}
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

updateData = (userI) => {
  try {
    var desiredObject = dataObject(userI.id)
    if (desiredObject) {
      var currentKey = desiredObject.id;
      console.log("\n Changing Users data \n");
      console.log(`Id: ${Object.keys(desiredObject)[0]}`);
      var userIk = Object.keys(userI)
      for (let i = 0; i < JSON.stringify(userI).length; i++) {
        userIk = userIk[ui]
        file.users[0][currentKey].userIk = ui.userIk;
      }
      // array.forEach(ui => file.users[0][currentKey].userIKeys[ui] = ui.userIKeys[ui]);
      //  userI.map(ui => file.users[0][currentKey].Object.keys(ui) = Object.keys(ui))
      //  file.users[0][currentKey].stage = stage;
      //  file.users[0][currentKey].step = step;
      //  file.users[0][currentKey].name = name;

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
function createUser(id, obj) {
  return new Promise(function (resolve, reject) {
    fs.readFile('userStage.json', function (err, content) {
      if (err) throw err;
      var parseJson = JSON.parse(content);
      let data = new User(id, obj);
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



