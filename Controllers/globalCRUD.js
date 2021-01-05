const User = require('../Models/userModel');
const Details = require('../Models/detailsModel');
const Barters = require('../Models/bartersModels');
const userLocal = require('./localCRUD');

function userModify(userI, id) {
      try {
            return new Promise(async (resolve, reject) => {
                  var response = await User.findByIdAndUpdate(id, userI, { new: true });
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


function getUser(id) {
      try {
            return new Promise(async (resolve, reject) => {
                  var response = await User.findById(id).exec();
                  const { createdAt, updatedAt, __v, _id, ...target } = response._doc;
                  resolve(target)
            })
      } catch (error) {
            console.log("Cannot Modify User")
      }
}

function detailModify(userD, id) {
      try {
            return new Promise(async (resolve, reject) => {
                  var response = await Details.findByIdAndUpdate(id, userD, { new: true });
                  const { createdAt, updatedAt, __v, _id, ...target } = response._doc;
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

function barterModify(userB, id) {
      console.log("barterModify id", id)
      try {
            return new Promise(async (resolve, reject) => {
                  var response = await Barters.findByIdAndUpdate(id, userB, { new: true });
                  const { createdAt, updatedAt, __v, _id, ...target } = response._doc;
                  resolve(target)
            })
      } catch (error) {
            console.log("Cannot Modify User")
      }
}


function createBarter(uId, tipo, nombre) {
      try {
            return new Promise(async (resolve, reject) => {
                  var barter = new Barters({
                        uId: uId,
                        tipo: tipo,
                        fotos: [],
                        nombre: nombre,
                        categorias: [],
                        descripcion: "",
                        cambio: ""
                  });
                  barter.save().then((response) => {
                        var doc = response._doc;
                        const { createdAt, updatedAt, __v, ...target } = doc;
                        resolve(target)
                  });
            })
      } catch (error) {
            console.log("Cannot Modify User")
      }
}

function getBarter(id) {
      try {
            return new Promise(async (resolve, reject) => {
                  var response = await Barters.findById(id).exec();
                  const { createdAt, updatedAt, __v, _id, ...target } = response._doc;
                  resolve(target)
            })
      } catch (error) {
            console.log("Cannot Modify User")

      }
}




module.exports = { userModify, getDetails, detailModify, getBarter, barterModify, createBarter, getUser };

