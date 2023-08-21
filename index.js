// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();
require('dotenv').config()

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

const routeLogMiddleware = (req,res,next) => {
  var string = req.method + " " + req.path + " - " + req.ip;
  console.log(string)
  next();
}
app.use(routeLogMiddleware);
// // your first API endpoint... 
// app.get("/api/hello", function (req, res) {
//   res.json({greeting: 'hello API'});
// });

app.get("/api",(req,res)=>{
  const date = new Date()
  res.json({unix:date.valueOf(),utc:date.toUTCString()});
})


app.get("/api/:date",(req,res)=>{
  // Getting timestamp from params and parsing it to int.
  let timestamp = req.params.date;
  const regix = /^\d{13}$/;
  if (regix.test(timestamp)){

    timestamp = parseInt(timestamp);
  }
  // Converting it to base
  let date = new Date(timestamp);

  // Check if it is a valid timestand
  if(date.toString() == "Invalid Date"){
    res.json({
      "error": "Invalid Date"
    });
  }
  res.json({unix:date.valueOf(),utc:date.toUTCString()});
  
}) 


// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
