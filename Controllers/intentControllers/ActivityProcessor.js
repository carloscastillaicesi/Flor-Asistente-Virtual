const registration = require("./Registration")
var mssg;
activityClassifier = ({ activity, step, intent, answer, id }) => {

  var dialog = { step: step, activity: activity, answer: answer, id: id };

  switch (activity) {
    case 'Registration':
      mssg = registration(intent, dialog);
      break;
    default:
      break;
  }
  return mssg;
};

module.exports = {
  activityClassifier
};  