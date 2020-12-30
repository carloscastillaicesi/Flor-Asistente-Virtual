var fs = require("fs");
const { search } = require("../Routes/inboundRouter");
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
  var fileData = fs.readFileSync('userStage.json');
  var file = JSON.parse(fileData);
  try {
    if (Object.keys(file.users).length > 0) {
      desiredObject = file.users.filter((users) => { return decrypt(Object.keys(users)[0]) === decrypt(id); })[0];
      if (desiredObject) {
        console.log("\n User Found !!! \n");
        var currentKey = Object.keys(desiredObject)[0];
        console.log("\n Getting Data...\n");
        var user = { id: Object.keys(desiredObject)[0], ...desiredObject[currentKey] }
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

updateData = (id, userI) => {
  return new Promise(function (resolve, reject) {
    fs.readFile('userStage.json', function (err, content) {
      if (err) throw err;
      var parseJson = JSON.parse(content);
      parseJson.users = parseJson.users.filter((users) => { return Object.keys(users)[0] !== id });
      desiredObject = new User(id, userI);
      parseJson.users.push(desiredObject);
      fs.writeFile('userStage.json', JSON.stringify(parseJson, null, 2), function (err) {
        if (err) {
          reject(err);
        } else {
          resolve(desiredObject);
        }
      })
    })
  })



  // return new Promise(function (resolve, reject) {

  //   console.log("\n Changing Users data \n");
  //   console.log(`Id: ${id}`);
  //   // var userIk = Object.keys(userI)
  //   // console.log("userIk", userIk)
  //   // console.log("userIk.length", userIk.length)
  //   // userIk.forEach(i => file.users[0][currentKey].userIk[i] = userI.userIk[i] ? userI.userIk[i] : file.users[0][currentKey].userIk[i]);
  //   // for (let i = 0; i < userIk.length; i++) {
  //   //   userIk = userIk[ui]
  //   //   console.log("i", i)
  //   //   file.users[0][currentKey].userIk = userI.userIk ? userI.userIk : file.users[0][currentKey].userIk;
  //   // for (let i = 0; i < file.users; i++) {
  //   //   file.users[i][id].geometry = userI.geometry ? userI.geometry : file.users[i][id].geometry;
  //   //   file.users[i][id].currentActivity = userI.currentActivity ? userI.currentActivity : file.users[i][id].currentActivity;
  //   //   file.users[i][id].currentStep = userI.currentStep ? userI.currentStep : file.users[i][id].currentStep;
  //   //   file.users[i][id].registered = userI.registered ? userI.registered : file.users[i][id].registered;
  //   //   file.users[i][id].name = userI.name ? userI.name : file.users[i][id].name;
  //   //   file.users[i][id].pic = userI.pic ? userI.pic : file.users[i][id].pic;
  //   // }

  //   // array.forEach(ui => file.users[0][currentKey].userIKeys[ui] = ui.userIKeys[ui]);
  //   //  userI.map(ui => file.users[0][currentKey].Object.keys(ui) = Object.keys(ui))

  //   try {
  //     fs.writeFile('userStage.json', JSON.stringify(file, null, 2), function (err, content) {
  //       if (err) throw err;
  //       resolve(content);
  //     })
  //   } catch (error) {
  //     reject("no user").catch(() => { });
  //   }
  // })
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



