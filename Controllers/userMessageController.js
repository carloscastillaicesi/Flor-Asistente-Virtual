const { response } = require('express');
const User = require('../Models/userModel');
const Details = require('../Models/detailsModel');
const userLocal = require('./localCRUD');
const UserT = require('../Models/usertestModel');

function userCheck(mssg) {
  return new Promise(function (resolve, reject) {
    var newMssgUser;
    var data = userLocal.dataObject(mssg.from);
    console.log("data userMessage", data)
    try {
      if (data === mssg.from) {
        var user = new User({
          _id: mssg.from,
          activity: 'Registration',
          step: 0,
          level: 0,
          name: "",
          geometry: [0, 0],
          pic: "",
          currentItem: "",
          currentDoc: ""
        });
        user.save().then((response) => {
          var doc = response._doc;
          const { createdAt, updatedAt, __v, _id, ...target } = doc;
          userLocal.createUser(response._id, target)
            .then((result) => {
              console.log(`New Local User & Mongo User : ${Object.keys(result)} `);
            })
        });

        var detail = new Details({
          _id: mssg.from,
          ubicacionHuerta: "",
          gallery: [],
          beneficiosSalud: "",
          expectativaHuerta: "",
          encargadosHuerta: "",
          tiempoDedicadoHuerta: "",
          tiempoExperiencia: "",
          conocimiento: "",
        });

        detail.save().then((response) => {
          var doc = response._doc;
          const { createdAt, updatedAt, __v, _id, ...target } = doc;
          console.log("new user Details", target);
        })
        var now = new Date();
        var jsonDate = now.toJSON();
        var then = new Date(jsonDate);
        var test = new UserT({
          step: 0,
          uId: mssg.from,
          level: 0,
          time: `${then.getHours()}: ${then.getMinutes()}: ${then.getSeconds()}`,
          date: `${then.getMonth()}/ ${then.getDate()}`,
          name: "",
          activity: "Registration",
          intent: "saludo",
          body: mssg.Body,
          messageType: "noMedia"

        });

        test.save().then((response) => {
          var doc = response._doc;
          const { __v, ...target } = doc;
          console.log(target)
        });

        newMssgUser = "new user";
      } else {
        newMssgUser = Object.assign(mssg, data)
      }
      resolve(newMssgUser);
    } catch (error) {
      reject(mssg);
    }
  })

}



module.exports = { userCheck };

