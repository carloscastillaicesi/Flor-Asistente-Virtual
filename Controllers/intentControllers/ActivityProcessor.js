const registration = require("./Registration")
var mssg;
activityClassifier = (activity) => {

  switch (activity.activity) {
    case 'Registration':
      mssg = registration(activity.intent, activity);
      break;
    default:
      break;
  }
  return mssg;
};

module.exports = {
  activityClassifier
};  