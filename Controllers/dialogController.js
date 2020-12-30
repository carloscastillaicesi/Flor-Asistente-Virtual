var dialog = [
 { activity: "Registration", step: 0, intent: "si", answer: 0, nextStep: 1, level: 0 },
 { activity: "Registration", step: 0, intent: "no", answer: 0, nextStep: 0, level: 0 },
 { activity: "Registration", step: 1, intent: "name", answer: 0, nextStep: 2, level: 0 },
 { activity: "Registration", step: 2, intent: "si", answer: 2, nextStep: 3, level: 0 },
 { activity: "Registration", step: 2, intent: "no", answer: 3, nextStep: 0, level: 0 },
 { activity: "Registration", step: 3, intent: "image", answer: 1, nextStep: 1, level: 0 },
 { activity: "Registration", step: 4, intent: "si", answer: 4, nextStep: 1, level: 0 },
 { activity: "Registration", step: 4, intent: "no", answer: 5, nextStep: 1, level: 0 },
 { activity: "Registration", step: 5, intent: "geometry", answer: 0, nextStep: 6, level: 0 },
]

function check({ activity, step, intent }) {
 return intent === 'None' ? "none" : dialog.filter(f => f.activity === activity && f.step === step && f.intent === intent)
}

function errorDialog(obj) {
 return { intent: obj.intent === 'None' ? 'none' : 'error', step: obj.step, activity: obj.activity, level: obj.level };
}

function dialogP(dialog, obj) {
 const { answers, entities, from, score, mediaType, ...objF } = obj
 return { activity: dialog.activity, step: dialog.step, nextStep: dialog.nextStep, level: dialog.level, intent: dialog.intent, answer: obj.answers[dialog.answer], entities: obj.entities ? obj.entities : "No Entities", ...objF }
}

function dialogController(obj) {

 var dialog;
 try {

  if (check(obj).length > 0 && check(obj) !== "none") {
   dialog = dialogP(check(obj)[0], obj)
  } else {
   dialog = errorDialog(obj);
  }
  return dialog;

 } catch (error) {
  console.log(error)
 }
}

module.exports = { dialogController };
