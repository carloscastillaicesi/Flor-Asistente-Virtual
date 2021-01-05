const registration = require("./Registration")
const detailed = require("./Detailed")
const menu = require("./Menu")
const barter = require("./Barter")
const options = require("./Options")
var mssg;

activityClassifier = (activity) => {
  if (activity.intent === "error") {
    mssg = "No entendí lo que dijiste. Por favor, repítelo 🙈"
  } else {
    switch (activity.activity) {
      case "Registration":
        mssg = registration(activity);
        break;
      case "Detailed":
        mssg = detailed(activity);
        break;
      case "Menu":
        console.log("Menu Activity");
        mssg = menu(activity);
        break;
      case "Tengo":
      case "Necesito":
        mssg = barter(activity);
        break;
      case "Options":
        mssg = options(activity);
        break;
      default:
        break;
    }
  }
  return mssg;
};

module.exports = {
  activityClassifier
};  