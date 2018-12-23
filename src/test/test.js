const test = require('tape');
const supertest = require('supertest');
const server = require('../server');
//const routes = require('../routes');
//const handlers = require('../handlers');

test('Initialise', function(t)  {
  t.pass('Dummy passing test to confirm tape is running.');
  t.end();
});

test('Home route generates valid html response', function(t)  {
  supertest(server)
    .get('/')
    .expect(200)
    .end(function(err, res) {
      t.error(err, 'Error and Server Response Code Check');
      t.equal(res.text.slice(-8), "</html>\n", 'Server response ends with html closing tag');
      server.close(t.end());
    });
});

test('Invalid route generates 404 response', function(t)  {
  supertest(server)
    .get('/elephants')
    .expect(404)
    .end(function(err, res) {
      t.error(err, 'Error and Server Response Code Check');
      server.close(t.end());
    });
});
