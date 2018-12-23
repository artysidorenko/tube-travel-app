const fs = require('fs');
const handlers = {};

handlers.home = function(req, res)  {
  let homepage = __dirname + '/../public/index.html';
  fs.readFile(homepage, 'utf8', function(err, file) {
    if (err)  {console.log(err);}
    res.writeHead(200, {'content-type': 'text/html'});
    res.end(file);
  });
};

handlers.notFound = function(req, res)  {
  res.writeHead(404, {'content-type': 'text/plain'});
  res.end('404 Page Not Found');
}

module.exports = handlers;
