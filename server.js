// server.js
// where your node app starts

// init project
require('dotenv').config();
var express = require('express');
var app = express();

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


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

//create middleware
app.get('/api/whoami',(req, res) => {
	//tes dulu apakah ada key ipaddress, software, language
	console.log(req.headers)
	let ipaddress = req.headers['x-forwarded-for'] || 
     req.connection.remoteAddress || 
     req.socket.remoteAddress ||
     req.connection.socket.remoteAddress;
  let language = req.headers['accept-language']; //ambil bahasanya
	let software = req.headers["user-agent"]; // ambil softwarenya
//return ke dalam json
	res.json({
		ipaddress: ipaddress,
		language: language,
		software: software
	})
})


// listen for requests :)
const PORT = 3000;
var listener = app.listen(PORT, function () {
  console.log('Your app is listening on port ' + PORT);
});
