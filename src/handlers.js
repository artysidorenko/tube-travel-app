const fs = require('fs');
const tubeRequests = require('./requests.js');
const handlers = {};

let responseToClient = function(response, contentType, responseText) {
  response.writeHead(200, {'content-type': contentType});
  response.end(responseText);
}

handlers.home = function(req, res)  {
  let homepage = __dirname + '/../public/index.html';
  fs.readFile(homepage, 'utf8', function(err, file) {
    if (err)  {console.log(err);}
    responseToClient(res, 'text/html', file);
  });
};

handlers.getStyles = function(req, res) {
  let homepage = __dirname + '/../public/styles.css';
  fs.readFile(homepage, 'utf8', function(err, file) {
    if (err)  {console.log(err);}
    responseToClient(res, 'text/css', file);
  });
};

handlers.getScripts = function(req, res) {
  let homepage = __dirname + '/../public/index.js';
  fs.readFile(homepage, 'utf8', function(err, file) {
    if (err)  {console.log(err);}
    responseToClient(res, 'text/javascript', file);
  });
};

handlers.searchStations = function (req, res) {
  let query = "";
  req.on('error', function(err) {
    console.log(err);
  });
  req.on('data', function(stream) {
    query += stream;
  });
  req.on('end', function()  {
    tubeRequests.searchStations(query, 5, function(apiError, apiResponse, apiResponseText) {
      if (apiError) {console.log(apiError);}
      let parsedResponse = JSON.parse(apiResponseText);
      let resultsArray = [];
      for (let i in parsedResponse.matches) {
        let station = {};
        station.name = parsedResponse.matches[i].name;
        station.id = parsedResponse.matches[i].id;
        resultsArray.push(station);
      }
      let resBody = JSON.stringify(resultsArray);
      res.writeHead(200, {'content-type': 'application/json'});
      res.end(resBody);
    });
  });
};

handlers.localStations = function (req, res) {
  let positionString = "";
  req.on('error', function(err) {
    console.log(err);
  });
  req.on('data', function(stream) {
    positionString += stream;
  });
  req.on('end', function()  {
    let positionObj = JSON.parse(positionString);
    tubeRequests.localStations(positionObj.lat, positionObj.lon, 2000, function(apiError, apiResponse, apiResponseText) {
      if (apiError) {console.log(apiError);}
      let parsedResponse = JSON.parse(apiResponseText);
      let resultsArray = [];
      for (let i=0; i<5; i++) {
        let station = {};
        station.name = parsedResponse.stopPoints[i].commonName;
        station.distance = parsedResponse.stopPoints[i].distance;
        station.id = parsedResponse.stopPoints[i].stationNaptan;
        resultsArray.push(station);
      }
      let resBody = JSON.stringify(resultsArray);
      res.writeHead(200, {'content-type': 'application/json'});
      res.end(resBody);
    });
  });
};

handlers.stationInfo = function(req, res)  {
  let station = "";
  req.on('error', function(err) {
    console.log(err);
  });
  req.on('data', function(stream) {
    station += stream;
  });
  req.on('end', function()  {
    tubeRequests.stationInfo(station, function(apiError, apiResponse, apiResponseText) {
      if (apiError) {console.log(apiError);}
      let parsedResponse = JSON.parse(apiResponseText);
      let resultsArray = [];
      for (let i in parsedResponse) {
        let arrival = {};
        arrival.line = parsedResponse[i].lineName;
        arrival.direction = parsedResponse[i].towards;
        arrival.expected = parsedResponse[i].timeToStation;
        if(arrival.expected < 600) {resultsArray.push(arrival);}
      }
      console.log(resultsArray);
      let resBody = JSON.stringify(resultsArray);
      res.writeHead(200, {'content-type': 'application/json'});
      res.end(resBody);
    });
  });
};

handlers.notFound = function(req, res)  {
  res.writeHead(404, {'content-type': 'text/plain'});
  res.end('404 Page Not Found');
};

module.exports = handlers;
