var { userC } = require('../userMessageController');
var { userModify } = require('../../Controllers/globalCRUD');

saludo = async ({ step, activity, id }) => {

  var mssg;

  switch (activity) {
    case 'Registration':
      switch (step) {
        case 0:
          var response = await userModify({ currentStep: 8, currentActivity: activity }, id);
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


module.exports = saludo; 