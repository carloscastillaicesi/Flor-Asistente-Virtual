const registration = require("./Registration")
const detailed = require("./Detailed")
var mssg;
activityClassifier = (activity) => {
  switch (activity.activity) {
    case "Registration":
      mssg = registration(activity.intent, activity);
      break;
    case "Detailed":
      mssg = detailed(activity.intent, activity);
      break;
    default:
      break;
  }
  return mssg;
};

module.exports = {
  activityClassifier
};  