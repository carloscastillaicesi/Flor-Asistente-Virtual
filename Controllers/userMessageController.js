const { response } = require('express');
const UserT = require('../Models/usertestModel');
const userLocal = require('./localCRUD');


function userCheck(mssg) {
  return new Promise(function (resolve, reject) {
    var newMssgUser;
    try {
      var data = userLocal.dataObject(mssg.from);
      console.log("data userCheck", data)
      if (data === mssg.from) {
        var user = new UserT({
          _id: mssg.from,
          currentActivity: 'Registration',
          currentStep: 0,
          level: 0,
          name: "",
          geometry: [],
          pic: ""
        });
        user.save().then((response) => {
          var doc = response._doc;
          const { createdAt, updatedAt, __v, _id, ...target } = doc;
          userLocal.createUser(response._id, target)
            .then((result) => {
              console.log(`New Local User & Mongo User : ${Object.keys(result)} `);
            })
        });
        var doc = user._doc;
        const { createdAt, updatedAt, __v, _id, ...data } = doc;
        newMssgUser = "new user";
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

