const registration = require("./Registration")
const detailed = require("./Detailed")
const menu = require("./Menu")
const tengo = require("./Tengo")
var mssg;

activityClassifier = (activity) => {
  if (activity.intent === "none") {
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
        console.log("hit the spot");
        mssg = menu(activity);
      case "Tengo":
        console.log("hit the spot");
        mssg = tengo(activity);
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