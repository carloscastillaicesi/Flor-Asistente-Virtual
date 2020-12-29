var dialog = [
 { activity: "Registration", step: 0, intent: "nombre", answer: 0 },
 { activity: "Registration", step: 2, intent: "foto", answer: 0 }
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
    mssg = { id: obj.id, activity: mssg.activity, step: mssg.step, intent: mssg.intent, answer: mssg.answer }
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
