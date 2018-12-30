const request = require('request');
const apiID = "1c6a249f";
const apiKey = "c8d005a9156804c923b1b9e4f179e17f";

var tubeRequests = {};

tubeRequests.searchStations = (query, maxResults, callback) =>  {
  const url = "https://api.tfl.gov.uk/StopPoint/Search/" + query + "?modesFilter=tube&oysterOnly=false&maxResults=" + maxResults + "&app_id=" + apiID + "&app_key=" + apiKey;
  request.get(url, callback);
};

tubeRequests.localStations = (lat, lon, radius, callback) =>  {
  const url = "https://api.tfl.gov.uk/StopPoint?lat=" + lat + "&lon=" + lon + "&stopTypes=NaptanMetroStation&radius=" + radius + "&app_id=" + apiID + "&app_key=" + apiKey;
  request.get(url, callback);
};

tubeRequests.stationInfo = (station, callback) => {
  const url = "https://api.tfl.gov.uk/StopPoint/" + station + "/Arrivals?app_id=" + apiID + "&app_key=" + apiKey;
  console.log(url);
  request.get(url, callback);
}

module.exports = tubeRequests;
