const handlers = require('./handlers');
const routes = {};

routes.route = function(req, res) {

  console.log(req.method + ': ' + req.url);

  if (req.url === '/')  {
    handlers.home(req, res);
  }
  else {
    handlers.notFound(req, res);
  }

}

module.exports = routes;
