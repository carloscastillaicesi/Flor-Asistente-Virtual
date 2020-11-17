const express = require("express");
const bodyParser = require("body-parser");
const pino = require("express-pino-logger")();
const mongoose = require('mongoose');
const cors = require('cors');

const inboundRoutes = require('../Routes/inboundRouter');
const readFile = require('../Controllers/UserLocalCRUD');


/**conection to db */
const dbURI = 'mongodb+srv://admin:Guitarcenter1@flor.vqk0u.mongodb.net/Flor_DB?retryWrites=true&w=majority';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true }).then((result) => {
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

/**Inbound Route - Twilio Endpoint*/
app.use(inboundRoutes);

/**404 route*/
app.use((req, res) => {
  res.status(400).send('<p>404</p>');
});







