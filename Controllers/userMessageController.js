const User = require('../Models/userModel');
const userLocal = require('./localCRUD');



function Mssg(req) {

 return newMssg = {
  from: data.id,
  name: data.name,
  step: data.step,
  stage: data.stage,
  body: mssg.Body,
  media: mssg.MediaUrl0,
  type: mssg.MediaContentType0
 }

};


function userCheck(req) {
 return new Promise(function (resolve, reject) {

  var data = userLocal.dataObject(from);
  if (data === from) {
   var user = new User({
    _id: id,
    step: 0,
    stage: "new"
   });
   user.save().then((response) => {
    var localUser = userLocal.createUser(response._id, response.step, response.stage)
    console.log(`Local User = ${localUser.id} & Mongo User : ${response._id} `)
    let newMssg = new Mssg(mssg);
    resolve(newMssg);
   });

  }



 })
}



module.exports = { userCheck };

