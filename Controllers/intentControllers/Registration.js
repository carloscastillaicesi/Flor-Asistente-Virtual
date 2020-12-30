var { userModify } = require('../globalCRUD');

registration = async (intent, dialog) => {

  var fn = intent.toString().trim().toLowerCase();
  // function exists
  if (fn in global && typeof global[fn] === "function") {
    return global[fn](dialog);
  }
  else {
    console.log("could not find " + fn + " function");
  }
}

// var mssg = () => {
//   return new Promise( function (resolve, reject) {



// userModify({ currentStep: 1, currentActivity: activity }, id);


//   }}

saludo = async ({ step, activity, id, answer }) => {

  return await mssg();

}


nombre = async ({ step, activity, id }) => {
  var response = await userModify({ currentStep: 1, currentActivity: activity }, id);

  var mssg = "Siguiente paso después del nombre"
  return mssg;
}


none = (dialog) => {
  var response;
  switch (dialog.step) {
    case 0:
      response = "No se tu nombre, porfavor damelo."
      break;

  }

  return response;
};




none = (dialog) => {
  var response;
  switch (dialog.step) {
    case 0:
      response = "No se tu nombre, porfavor damelo."
      break;
    default:
      break;
  }

  return response;
};





module.exports = registration; 