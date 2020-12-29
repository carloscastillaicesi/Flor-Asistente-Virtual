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

var mssg;

saludo = async ({ step, activity, id }) => {
  switch (activity) {
    case 'Registration':
      switch (step) {
        case 0:
          var response = await userModify({ currentStep: 1, currentActivity: activity }, id);
          console.log("after promise", response);
          mssg = "hello from intent saludo"
          break;
        default:
          break;
      }
      break;

    default:
      break;
  }
  return mssg;
}


nombre = async ({ step, activity, id }) => {
  var response = await userModify({ currentStep: 1, currentActivity: activity }, id);
  console.log("after promise", response);
  var mssg = "Siguiente paso después del nombre"
  return mssg;
}


mapa = async ({ step, activity, id }) => {
  var response = await userModify({ currentStep: 2, currentActivity: activity }, id);
  console.log("after promise", response);
  var mssg = "Siguiente paso después de foto"
  return mssg;
};


none = (dialog) => {
  var response;
  switch (dialog.activity) {

    case "Registration":
      switch (dialog.step) {
        case 0:
          response = "No se tu nombre, porfavor damelo."
          break;

        default:
          break;
      }
      break;

    default:
      break;
  }


  return response;
};



error = (dialog) => {
  var response;
  switch (dialog.activity) {

    case "Registration":
      switch (dialog.step) {
        case 0:
          response = "No se tu nombre, porfavor damelo."
          break;

        default:
          break;
      }
      break;

    default:
      break;
  }


  return response;
};



module.exports = registration; 