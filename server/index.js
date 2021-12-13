const express = require("express");
const bodyParser = require("body-parser");
const pino = require("express-pino-logger")();
const { Telegraf } = require('telegraf');
const mongoose = require('mongoose');
const cors = require('cors');
const User = require('../Models/userModel');
const Details = require('../Models/detailsModel');
const Documents = require('../Models/documentsModel');
const Barters = require('../Models/bartersModels');
const inboundRoutes = require('../Routes/inboundRouter');
const { inboundReceiverTelegram } = require('../Controllers/inboundController')
const { sendCustomTMessage, sendCustomTVCard, sendCustomTDocument } = require("../Controllers/messagingController");

const app = express();
/**Cors */
app.use(cors());
/**Accepting form data */
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(pino);


//Telegram 

const { NGROK, TELEGRAM_TOKEN } = process.env;
const TELEGRAM_API = `https://api.telegram.org/bot${TELEGRAM_TOKEN}`;
const URL = `/webhook/${TELEGRAM_TOKEN}`;
const WEBHOOK_URL = NGROK + URL

const bot = new Telegraf(TELEGRAM_TOKEN)

bot.on('message', async (ctx, next) => {

  var mRepply = await inboundReceiverTelegram(ctx.message, bot);
  ctx.reply(mRepply);
  // Message Type is: STICKER or Message Type is: TEXT
});

// bot.on('message', async (ctx) => console.log(await bot.telegram.getFileLink(ctx.message.photo[2].file_id)))

bot.launch();


/*
    await init()
const init = async () => {
  const res = await axios(`${TELEGRAM_API}/setWebhook?url=${WEBHOOK_URL}`);
  console.log("FROM TELEGRAM", res.data)
}
app.post(URL, async (req, res) => {
  console.log(req.body)
  const chatId = req.body.message.chat.id

  if (req.body.message.photo) {
    try {
      var picGet = "";
      console.log("inside photo");
      picGet = await axios(`${TELEGRAM_API}/getFile?file_id=${req.body.message.photo[2].file_id}`);
      picGet = picGet.data.result.file_path;
      const photo = `https://api.telegram.org/file/bot${TELEGRAM_TOKEN}/${picGet}`
      await axios.post(`${TELEGRAM_API}/sendPhoto`, {
        chat_id: chatId,
        photo: photo
      })
    } catch (error) {
      console.log(error)
    }
  } else {
    try {
      const text = req.body.message.text
      await axios.post(`${TELEGRAM_API}/sendMessage`, {
        chat_id: chatId,
        text: text
      })
    } catch (error) {
      console.log("hubo un error y entró a texto");
    }
  }
  return res.send()
})**/

/**conection to db */
const dbURI = 'mongodb+srv://admin:Guitarcenter1@flor.vqk0u.mongodb.net/Flor_DB?retryWrites=true&w=majority';

app.listen(process.env.PORT || 5000, async () => {
  try {
    console.log('🚀 app running on port', process.env.PORT || 5000)
    await mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
    console.log("Connected to DB")
  } catch (error) {
    console.log(error.message)
  }

})

/**Correcting Mongoose error: collection.ensureIndex is deprecated. Use createIndexes instead.*/
mongoose.set('useCreateIndex', true)


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

app.get('/sendocument/:sender', function (req, res) {
  console.log(req.params.sender)
  Documents.findOne({ _id: req.params.sender.split("-")[1] }, function (err, doc) {
    if (err) throw console.log(err);
    res.status(200);
    res.json(doc);
    sendCustomTDocument(`*¡Hola!* 💚🌱\n\nEspero que este documento sea de tu ayuda\n\n 📄 *Nombre del documento*: ${doc.nombre} \n\n 📚 *Categorías del documento*: ${doc.categorias.join(",")} \n\n 🔗 *Link*: ${doc.url}\n\n Tambien puedes ver el documento en el siguiente link: \n\n 06477217792d.ngrok.io/menu/doc/${req.params.sender.split("-")[1]} `, req.params.sender.split("-")[0])
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



// /**Inbound Route - Twilio Endpoint*/
// app.use(inboundRoutes);


// /**404 route*/
// app.use((req, res) => {
//   res.status(400).send('<p>404</p>');
// });







