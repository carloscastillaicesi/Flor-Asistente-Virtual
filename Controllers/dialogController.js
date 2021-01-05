var fs = require("fs");
var fileData = fs.readFileSync('dialog.json');
var file = JSON.parse(fileData);
var dialog = file.dialog

function check({ activity, step, intent }) {
 return dialog.filter(f => f.activity === activity && f.step === step && f.intent.includes(intent))
}

function errorDialog(obj) {
 return { intent: obj.intent === "None" ? "none" : "error", step: obj.step, activity: obj.activity, level: obj.level };
}

function dialogP(dialog, obj) {
 const { answers, entities, from, score, mediaType, step, level, ...objF } = obj

 const { answer, intent, ...dialogF } = dialog
 return { ...dialogF, answer: dialog.answer, entities: obj.entities, ...objF }
}

function dialogPError(dialog, obj) {
 const { answers, entities, from, score, mediaType, step, level, intent, ...objF } = obj

 const { answer, ...dialogF } = dialog
 return { ...dialogF, answer: dialog.answer, entities: obj.entities, ...objF }
}

function dialogController(obj) {
 var dialog;
 try {

  if (check(obj).length > 0) {
   dialog = dialogP(check(obj)[0], obj)
  } else {
   dialogE = errorDialog(obj);
   console.log("dialogE", dialogE)
   if (check(dialogE).length > 0) {
    dialog = dialogPError(check(dialogE)[0], obj)
    console.log("dialogE2", dialog)
   } else {
    dialog = errorDialog(obj);
   }

  }
  return dialog;

 } catch (error) {
  console.log(error)
 }
}

module.exports = { dialogController };
