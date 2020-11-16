// Node Modules
const express = require("express");
const bodyParser = require("body-parser");
const pino = require("express-pino-logger")();
const mongoose = require('mongoose');


// My own modules
const inboundRoutes = require('../Routes/inboundRouter');

//conection to the db 
const dbURI = 'mongodb+srv://admin:Guitarcenter1@flor.vqk0u.mongodb.net/Flor_DB?retryWrites=true&w=majority';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true }).then((result) => {
  console.log("connected to DB");
  app.listen(5000, () => console.log("Running server in localhost:5000"));
}).catch((error) => { console.log(error.message) });

//Correcting Mongoose error: collection.ensureIndex is deprecated. Use createIndexes instead.
mongoose.set('useCreateIndex', true)

const app = express();

//Accepting form data 
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(pino);

//Inbound Route - Twilio Endpoint
app.use(inboundRoutes);

//404 route  
app.use((req, res) => {
  res.status(400).send('<p>404</p>');
});







