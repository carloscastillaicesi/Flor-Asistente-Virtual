const User = require('../Models/usertestModel');
const userLocal = require('./localCRUD');

/*
from: id,
     messageType: mediaType,
      */

function UserData(data) {

  return userData = {
    from: Object.keys(data)[0],
    currentActivity: data.currentStep,
    currentStep: data.currentStep,
    registered: data.registered
  }

};

function userCheck(mssg) {
  return new Promise(function (resolve, reject) {
    var newMssgUser;
    try {
      var data = userLocal.dataObject(mssg.from);
      if (data === mssg.from) {
        var user = new User({
          _id: mssg.from,
          currentActivity: "Registration",
          currentStep: 0,
          registered: 0,
          name: ""
        });
        user.save().then((response) => {
          userLocal.createUser(response._id, response.currentActivity, response.currentStep, response.registered, response.name)
            .then((result) => {
              var target = new UserData(result);
              console.log(`New Local User = ${target.from} & Mongo User : ${response._id} `);
              newMssgUser = Object.assign(mssg, target)
            })

        });
      } else {
        var data = userLocal.dataObject(mssg.from);
        newMssgUser = Object.assign(mssg, data)
      }
      resolve(newMssgUser);
    } catch (error) {
      reject(mssg);
    }
  })

}



module.exports = { userCheck };

