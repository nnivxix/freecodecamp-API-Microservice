// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();
const port = 3000;
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

// 1. create timestamp function
const getTimeStamp = (date) => ({
	unix: date.getTime(), // will return random Number
	utc: date.toUTCString() //will return date like normally
})

//test example
const maTime = getTimeStamp(new Date())
console.log(maTime)
console.log('msg')


//2. create middleware
app.get('/api/timestamp', (req, res) => {
	// use let for dinamic value
	// get timestamp variable
	let timestamp = getTimeStamp(new Date())
	res.json(timestamp)
	//res.send('hello')
})

app.get('/api/timestamp/:datestring', (req, res) => {
	// req.url is native from Node.js https://transang.me/expressjs-req-url-originalurl-path-baseurl/
	let dateString = req.params.datestring
	if (/\d{5,}/.test(dateString)) {
		const dateInt = parseInt(dateString);
		res.json({
			unix: dateInt,
			utc: new Date(dateInt).toUTCString()
		})
	} else{
		let dateObj = new Date(dateString);
		if (dateObj.toString() === 'Invalid Date') {
			res.json({
				error: "Invalid Date"
			})
		} else{
			res.json({
				unix: dateObj.valueOf(),
				utc: dateObj.toUTCString()
			})
		}
	}
	//res.json(timestamp)
})

// listen for requests :)
var listener = app.listen(port, function () {
  console.log('Your app is listening on port ' + port);
});
