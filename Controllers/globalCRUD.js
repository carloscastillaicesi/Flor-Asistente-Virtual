const UserT = require('../Models/usertestModel');
const userLocal = require('./localCRUD');

/*
from: id,
     messageType: mediaType,
      */

// function UserData(data) {

//  return userData = {
//   from: Object.keys(data)[0],
//   currentActivity: data.currentStep,
//   currentStep: data.currentStep,
//   registered: data.registered
//  }

// };

userModify = (userI, id) => {
      return new Promise(async (resolve, reject) => {
            var newMssgUser;
            try {
                  var response = await UserT.findOneAndUpdate(id, userI, { new: true });
                  // var exampleFilter = ({ id, currentActivity, currentStep, registered, name, geometry, pic }) => ({ id, currentActivity, currentStep, registered, name, geometry, pic })
                  // var localUser = userLocal.updateData(response);
                  // console.log(`Local User = ${localUser} & Mongo User : ${response._id} `)

                  resolve(response);
            } catch (error) {
                  console.log(error.message);
                  var newMssgUser = "No such user";
                  reject(newMssgUser);
            }
      })

}




// var data = userLocal.dataObject(mssg.from);
// if (data === mssg.from) {
//  var user = new User({
//   _id: mssg.from,
//   currentActivity: "Registration",
//   currentStep: 0,
//   registered: 0,
//   name: ""
//  });
//  user.save().then((response) => {
//   userLocal.createUser(response._id, response.currentActivity, response.currentStep, response.registered, response.name)
//    .then((result) => {
//     var target = new UserData(result);
//     console.log(`New Local User = ${target.from} & Mongo User : ${response._id} `);
//     newMssgUser = Object.assign(mssg, target)
//    })

//  });
// } else {
//  var data = userLocal.dataObject(mssg.from);
//  newMssgUser = Object.assign(mssg, data)
// }



module.exports = { userModify };

