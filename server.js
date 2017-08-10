// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

var moment = require('moment');

// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

app.post('/', function (req, res) {
  res.json(createJSON(null, null))
})

app.post('/:time', function(req, res) {
  var timeParam = req.params.time
  var timeMoment = moment(timeParam)
  
  if (!isNaN(timeParam)) {
    // need to convert to number
    timeParam = Number(timeParam)
    timeMoment = moment().unix(timeParam)
  }
  
  if (timeMoment.isValid) {
    res.json(createJSON(timeMoment.unix(), timeMoment.format('MMMM D, YYYY')))
  } else {
    return res.sendStatus(500).send('Not a valid time string')
  }
})

function createJSON(unix, natural) {
  var results = {}
  results['unix'] = unix
  results['natural'] = natural
  return results
}

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});



app.get("/dreams", function (request, response) {
  response.send(dreams);
});

// could also use the POST body instead of query string: http://expressjs.com/en/api.html#req.body
app.post("/dreams", function (request, response) {
  dreams.push(request.query.dream);
  response.sendStatus(200);
});

// Simple in-memory store for now
var dreams = [
  "Find and count some sheep",
  "Climb a really tall mountain",
  "Wash the dishes"
];

// listen for requests :)
var listener = app.listen(process.env.PORT || '3939', function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
