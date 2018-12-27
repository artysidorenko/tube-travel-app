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

  var displayResults = function(results) {
    var instructionsPanel = document.getElementById("instructions-panel");
    instructionsPanel.style.display = "none";
    var resultsPanel = document.getElementById("results-panel");
    var resultsList = document.createElement('div');
    resultsList.classList.add("station-list");
    for (var i in results)  {
      console.log(results[i]);
      var listItem = document.createElement('a');
      var station = results[i];
      listItem.textContent = station;
      listItem.href = "/StationInfo/" + station;
      listItem.classList.add("station-link");
      resultsList.appendChild(listItem);
    }
    resultsPanel.appendChild(resultsList);
    resultsPanel.style.display = "block";
  };

  window.onload = function()  {
    var manSubmit = document.getElementById("man-submit");
    manSubmit.addEventListener('click', function()  {
      searchStations(displayResults);
    });
  };

  //module.exports = {searchStations, displayResults};

})();
