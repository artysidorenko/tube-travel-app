const http = require('http');
const routes = require('./routes.js');

const host = process.env.HOST || 'localhost';
const port = process.env.PORT || 4000;
const server = http.createServer(routes.route);

server.listen(port);
console.log('Server running, listening on http://' + host + ':' + port);

server.on('close', function() {
  console.log('Server now closed.');
});

module.exports = server;
