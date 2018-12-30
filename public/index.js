(function() {

  var searchStations = function(callback) {
    var manSearch = document.getElementById("man-search");
    var query = manSearch.value;
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4 && xhr.status === 200) {
        var responseObj = JSON.parse(xhr.responseText);
        callback(responseObj);
      }
    }
    xhr.open('POST', '/searchStations', true);
    xhr.setRequestHeader('content-type', 'text/plain');
    xhr.send(query);
  };

  var findLocalStations = function(callback)  {
    var positionObj = {
      lat: "",
      lon: "",
    };
    if (navigator.geolocation)  {
      navigator.geolocation.getCurrentPosition(function(position) {
        positionObj.lat = position.coords.latitude;
        positionObj.lon = position.coords.longitude;
        var positionString = JSON.stringify(positionObj);
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
          if (xhr.readyState === 4 && xhr.status === 200) {
            var responseObj = JSON.parse(xhr.responseText);
            callback(responseObj);
          }
        }
        xhr.open('POST', '/localStations', true);
        xhr.setRequestHeader('content-type', 'application/json');
        xhr.send(positionString);
      });
    }
    else {console.log("test failed");}
  };

  var stationInfo = function(stationId, station, callback)  {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4 && xhr.status === 200) {
        var responseObj = JSON.parse(xhr.responseText);
        callback(station, responseObj);
      }
    }
    xhr.open('POST', '/StationInfo', true);
    xhr.setRequestHeader('content-type', 'text/plain');
    xhr.send(stationId);
  };

  var displayTrains = function(station, results) {
    var instructionsPanel = document.getElementById("instructions-panel");
    instructionsPanel.style.display = "none";
    var resultsPanel = document.getElementById("results-panel");
    resultsPanel.style.display = "none";
    var trainsPanel = document.getElementById("trains-panel");
    trainsPanel.innerHTML = "<svg height='60pt' viewBox='0 -32 384 384' width='60pt' xmlns='http://www.w3.org/2000/svg'><path d='m192 0c-66.824219 0-126.753906 42.207031-149.832031 104h-42.167969v112h42.167969c23.078125 61.792969 83.007812 104 149.832031 104 66.894531 0 126.832031-42.207031 149.847656-104h42.152344v-112h-42.167969c-23.078125-61.792969-83.007812-104-149.832031-104zm0 32c49.328125 0 93.984375 28.734375 115.097656 72h-230.195312c21.105468-43.265625 65.769531-72 115.097656-72zm0 256c-49.328125 0-93.992188-28.734375-115.097656-72h230.21875c-21.058594 43.273438-65.722656 72-115.121094 72zm160-152v48h-320v-48zm0 0'/></svg><h3 id='trains-header'></h3>";
    trainsPanel.style.display = "block";
    var trainsList = document.createElement('div');
    trainsList.classList.add("trains-list");
    var trainsHeader = document.getElementById('trains-header');
    trainsHeader.textContent = "Expected Arrivals for " + station + ":";
    console.log(results);
    if (results.length == 0)  {
      var noTrains = document.createElement('p');
      noTrains.textContent = "Currently no trains are expected...";
      trainsPanel.appendChild(noTrains);
    }
    for (var i in results)  {
      var train = document.createElement('ul');
      var line = document.createElement('li');
      var direction = document.createElement('li');
      var expected = document.createElement('li');

      line.textContent = "Line: " + results[i].line;
      direction.textContent = "To: " + results[i].direction;
      expected.textContent = "Arriving: " + Math.round(results[i].expected/60) + " min";

      train.appendChild(line);
      train.appendChild(direction);
      train.appendChild(expected);
      trainsList.appendChild(train);
    }
    trainsPanel.appendChild(trainsList);

  };

  var displayStations = function(results) {
    var trainsPanel = document.getElementById("trains-panel");
    trainsPanel.style.display = "none";
    var instructionsPanel = document.getElementById("instructions-panel");
    instructionsPanel.style.display = "none";
    var resultsPanel = document.getElementById("results-panel");
    resultsPanel.innerHTML = "";
    var resultsList = document.createElement('div');
    resultsList.classList.add("station-list");
    for (var i in results)  {
      var listItem = document.createElement('button');
      const stationName = results[i].name.replace(' Underground Station', '');
      var station = stationName;
      if (results[i].distance)  {station += " ("+ Math.round(results[i].distance) +" m)";}
      listItem.textContent = station;
      const stationID = results[i].id;
      listItem.id = stationID;
      listItem.classList.add("station-link");
      listItem.addEventListener('click', function() {
        stationInfo(stationID, stationName, displayTrains);
      });
      resultsList.appendChild(listItem);
    }
    resultsPanel.appendChild(resultsList);
    resultsPanel.style.display = "block";
  };

  window.onload = function()  {
    var manSubmit = document.getElementById("man-submit");
    manSubmit.addEventListener('click', function()  {
      searchStations(displayStations);
    });
    var locationBtn = document.getElementById("find-me");
    locationBtn.addEventListener('click', function()  {
      findLocalStations(displayStations);
    });
  };

  if (typeof module !== 'undefined' && module.exports) {
  module.exports = {searchStations, findLocalStations, displayStations, displayTrains};
}

})();
