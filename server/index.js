const express = require("express");
const bodyParser = require("body-parser");
const pino = require("express-pino-logger")();
const inboundRoutes = require('../Routes/inboundRouter');


/* Other way to send messages in twilio
const { ModelBuildContext } = require("twilio/lib/rest/preview/understand/assistant/modelBuild");*/
const client = require("twilio")(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

const app = express();

//Accepting form data 
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(pino);


app.get('/user/:userId', function (req, res) {
  console.log(req.params);
  res.setHeader("Content-Type", "application/json");
  db.ref("users")
    .child(req.params.userId)
    .once("value")
    .then(function (snapshot) {
      var snap = snapshot.val();
      if (!snapshot.exists()) {
        res.send(JSON.stringify("nothing here"));
      } else {
        res.send(JSON.stringify({ greeting: `Hello ${snap.name}!`, stage: `Hello ${snap.stage}!` }));
      }
    });
});

app.use(inboundRoutes);
//404 route  
app.use((req, res) => {
  res.status(400).send('<p>404</p>');
});

app.listen(5000, () => {
  console.log("Express is running in localhost:5000");
})





