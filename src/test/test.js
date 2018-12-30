const test = require('tape');
const JSDOM = require('jsdom').JSDOM;
const fs = require('fs');


const html = fs.readFile(__dirname + '/../../public/index.html', 'utf8');
const DOM = new JSDOM(html);

global.window = DOM.window;
global.navigator = {
  userAgent: 'node.js'
};

const supertest = require('supertest');
const server = require('../server');
const {searchStations, getLocation} = require('../../public/index.js');

//const routes = require('../routes');
//const handlers = require('../handlers');

//define 'window' in the back end (dummy variable - will not be used in any back end or testing)

test('Initialise', function(t)  {
  t.pass('Dummy passing test to confirm tape is running.');
  t.end();
});

test('Client-side Javascript', function(t)  {
  t.equal(typeof getLocation(), 'object', 'getLocation returns an object');
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

test('styles.css route generates valid css file response', function(t)  {
  supertest(server)
    .get('/styles.css')
    .expect(200)
    .expect('Content-Type', /css/)
    .end(function(err, res) {
      t.error(err, 'Error and Server Response Code/Content-Type Check');
      server.close(t.end());
    });
});

test('index.js route generates valid js file response', function(t)  {
  supertest(server)
    .get('/index.js')
    .expect(200)
    .expect('Content-Type', /javascript/)
    .end(function(err, res) {
      t.error(err, 'Error and Server Response Code/Content-Type Check');
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
