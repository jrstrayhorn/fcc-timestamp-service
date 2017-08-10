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

app.get('/:time', function(req, res) {
  var timeParam = req.params.time
  var timeMoment

  if (!isNaN(timeParam)) {
    // since number need to parse via Unix time
    timeMoment = moment(timeParam, 'X')
  } else {
    timeMoment = moment(timeParam, 'MMMM D, YYYY')
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

// listen for requests :)
var listener = app.listen(process.env.PORT || '3939', function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
