const express = require('express')
const app = express()
const http = require('http').createServer(app);
const router  = require('./app/routes/api')
const nocache = require('nocache')
const bodyParser = require('body-parser');
const cron = require("node-cron");


const {fetchGame, fetchMarket} = require('./app/controllers/GameController')

const appname = 'Market Data'
const port = 80


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())



app.use(function(req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", '*');
  res.setHeader("Access-Control-Allow-Credentials",true);
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Accept,X-Access-Token,X-Key,Authorization,X-Requested-With,Origin,Access-Control-Allow-Origin,Access-Control-Allow-Credentials');
  next();
});



app.use(nocache())

app.use('/', router)

cron.schedule("*/5 * * * * *", function() {
// cron.schedule("*/60 * * * * *", function() {
  fetchGame()
  fetchMarket()
  console.log('Getting Data..............')
});


http.listen(port, () =>
  console.log(appname+` App listening at http://localhost:${port}`)
)

