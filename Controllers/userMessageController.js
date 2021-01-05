const { response } = require('express');
const User = require('../Models/userModel');
const Details = require('../Models/detailsModel');
const userLocal = require('./localCRUD');


function userCheck(mssg) {
  return new Promise(function (resolve, reject) {
    var newMssgUser;
    var data = userLocal.dataObject(mssg.from);
    try {
      if (data === mssg.from) {
        var user = new User({
          _id: mssg.from,
          activity: 'Registration',
          step: 0,
          level: 0,
          name: "",
          geometry: [],
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

