const User = require('../Models/userModel');
const Details = require('../Models/detailsModel');
const userLocal = require('./localCRUD');


function userModify(userI, id) {
      try {
            return new Promise(async (resolve, reject) => {
                  var response = await User.findOneAndUpdate(id, userI, { new: true });
                  var doc = response._doc;
                  const { createdAt, updatedAt, __v, _id, ...target } = doc;
                  console.log("responseUser", target);
                  var localUser = await userLocal.updateData(id, target);
                  console.log("localUser", localUser);
                  resolve(localUser)
            })
      } catch (error) {
            console.log("Cannot Modify User")
      }
}

function detailModify(userD, id) {
      try {
            return new Promise(async (resolve, reject) => {
                  var response = await Details.findOneAndUpdate(id, userD, { new: true });
                  const { createdAt, updatedAt, __v, _id, ...target } = response;
                  resolve(target)
            })
      } catch (error) {
            console.log("Cannot Modify User")
      }
}


function getDetails(id) {
      try {
            return new Promise(async (resolve, reject) => {
                  var response = await Details.findById(id).exec();
                  const { createdAt, updatedAt, __v, _id, ...target } = response._doc;
                  resolve(target)
            })
      } catch (error) {
            console.log("Cannot Modify User")

      }
}


module.exports = { userModify, getDetails, detailModify };

