var dialog = [
 { activity: "Registration", step: 0, intent: "si", answer: 0 },
 { activity: "Registration", step: 0, intent: "no", answer: 1 },
 { activity: "Registration", step: 1, intent: "nombre", answer: 0 },
 { activity: "Registration", step: 2, intent: "si", answer: 2 },
 { activity: "Registration", step: 2, intent: "no", answer: 3 },
 { activity: "Registration", step: 3, intent: "image", answer: 1 },
 { activity: "Registration", step: 4, intent: "si", answer: 4 },
 { activity: "Registration", step: 4, intent: "no", answer: 5 },
 { activity: "Registration", step: 5, intent: "location", answer: 0 },

]

function check({ currentActivity, currentStep, intent }) {
 return intent === 'None' ? [{ intent: "none ", step: currentStep, activity: currentActivity }] : dialog.filter(f => f.activity === currentActivity && f.step === currentStep && f.intent === intent)
}

function dialogController(obj) {
 return new Promise(function (resolve, reject) {
  var mssg;
  var errorMssg;
  try {
   if (check(obj).length > 0) {
    mssg = check(obj)[0];
    mssg = { id: obj.id, activity: mssg.activity, step: mssg.step, intent: mssg.intent, answer: obj[mssg.answer], body: obj.body, intent: obj.intent }
   } else {
    errorMssg = { intent: "error", uStep: obj.currentStep, activity: obj.currentActivity }
    mssg = errorMssg;
   }
   resolve(mssg);
  } catch (error) {
   mssg = "error";
   reject(mssg);
   console.log("error", obj);
  }
 })

}

module.exports = { dialogController };
