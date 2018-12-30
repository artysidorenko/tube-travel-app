const handlers = require('./handlers');
const routes = {};

routes.route = function(req, res) {

  console.log(req.method + ': ' + req.url);

  if (req.url === '/')  {
    handlers.home(req, res);
  }
  else if (req.url === '/styles.css')  {
    handlers.getStyles(req, res);
  }
  else if (req.url === '/index.js')  {
    handlers.getScripts(req, res);
  }
  else if (req.method === 'POST' && req.url === '/StationInfo') {
    handlers.stationInfo(req, res);
  }
  else if (req.method === 'POST' && req.url === '/searchStations')  {
    handlers.searchStations(req, res);
  }

  else if (req.method === 'POST' && req.url === '/localStations')  {
    handlers.localStations(req, res);
  }
  else {
    handlers.notFound(req, res);
  }

}

module.exports = routes;
