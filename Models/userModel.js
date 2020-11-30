const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  _id: {
    type: String,
    required: true,
  },
  currentActivity: {
    type: String,
  },
  currentStep: {
    type: Number,
  },
  registered: {
    type: Number,
  },
  name: {
    type: String,
  }
}, { timestamps: true });

/**
 * This issue is probably coming from the fact that you are creating a mongoose model without specifying the name of the collection.
 * const Model = mongoose.model("Model", fileSchema, "NameOfCollection");
 */
const User = mongoose.model('User', userSchema, 'users');


module.exports = User;

// const getName = function (input, type) {
//   var name = input.toLowerCase;
//   var searchTerm;
//   switch (type) {
//     case 1:
//       var searchTerm = "llamo";
//       var index = searchTerm.lastIndexOf();
//       console.log(index);
//       var name = input.slice(index);
//       break;
//     case 2:
//       var searchTerm = "nombre es";
//       var index = searchTerm.lastIndexOf();
//       console.log(index);
//       var name = input.slice(index);
//       break;
//     default:
//       var searchTerm = "";
//       var index = searchTerm.lastIndexOf();
//       console.log(index);
//       var name = input.slice(index);
//       break;
//   }

//   return name;
// };

