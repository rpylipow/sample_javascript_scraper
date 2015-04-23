var Hapi = require('hapi');
var routes = require('./routes');

var server = new Hapi.Server();
server.connection({ 
    host: 'localhost', 
    port: 8000 
});

server.route(routes);

server.start();
console.log('Running on port 8000');
