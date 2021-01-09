const express = require("express");
const bodyParser = require("body-parser");
const pino = require("express-pino-logger")();
const mongoose = require('mongoose');
const cors = require('cors');
const User = require('../Models/userModel');
const Details = require('../Models/detailsModel');
const Documents = require('../Models/documentsModel');
const Barters = require('../Models/bartersModels');
const inboundRoutes = require('../Routes/inboundRouter');
const { sendCustomTMessage, sendCustomTVCard } = require("../Controllers/messagingController");

/** Create something to get the user info and then the message info an then append de the NLP processing
 */


/**conection to db */
const dbURI = 'mongodb+srv://admin:Guitarcenter1@flor.vqk0u.mongodb.net/Flor_DB?retryWrites=true&w=majority';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false }).then((result) => {
  console.log("connected to DB");
  app.listen(5000, () => console.log("Running server in localhost:5000"));

}).catch((error) => { console.log(error.message) });

/**Correcting Mongoose error: collection.ensureIndex is deprecated. Use createIndexes instead.*/
mongoose.set('useCreateIndex', true)

const app = express();

/**Cors */
app.use(cors());
/**Accepting form data */
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(pino);



app.get('/map/documents', function (req, res) {
  Documents.find({}, function (err, user) {
    if (err) throw err;
    res.status(200);
    res.json(user);
    // returns null
  });

})

app.get('/map/barters', function (req, res) {
  Barters.find({}, function (err, user) {
    if (err) throw err;
    res.status(200);
    res.json(user); // returns null
  });
})


app.get('/sendcontact/:sender', function (req, res) {
  console.log(req.params.sender)
  User.find({ _id: req.params.sender.split("-")[1] }, function (err, user) {
    if (err) throw console.log(err);
    res.status(200);
    res.json(user);
    sendCustomTVCard(`*¡Hola!* 💚🌱\n\nPor favor, recuerda introducirte mencionando que haces parte de la red de Sembrando Vida. Acá esta el contacto que me has pedido: \n\n 🧍 *Nombre*: ${user[0].name} \n\n 📱 *Teléfono*: `, req.params.sender.split("-")[0], req.params.sender.split("-")[1])
  });


})

app.get('/map/aboutme', function (req, res) {
  Details
    .find({}, function (err, user) {
      if (err) throw err;
      res.status(200);
      res.json(user); // returns null
    });
})


app.get('/user/:userId', function (req, res) {
  User
    .findOne({ _id: req.params.userId }, function (err, user) {
      if (err) throw err;
      res.status(200);
      res.json(user); // returns null
    });
})

app.get('/map/:userId', function (req, res) {
  User
    .find({
      "_id": { $ne: req.params.userId }
    }, function (err, user) {
      if (err) throw err;
      res.status(200);
      res.json(user); // returns null
    });
})

app.get('/map/users', function (req, res) {
  User
    .find({}, function (err, user) {
      if (err) throw err;
      res.status(200);
      res.json(user); // returns null
    });
})


/**Inbound Route - Twilio Endpoint*/
app.use(inboundRoutes);


/**404 route*/
app.use((req, res) => {
  res.status(400).send('<p>404</p>');
});







