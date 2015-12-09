var Hapi = require('hapi');
var Good = require('good');

var server = new Hapi.Server();
server.connection({ port: 8000 });

server.route({
  method: 'GET',
  path: '/',
  handler: function (request, reply) {
    reply('Welcome to the Root.');
  }
});


server.register(require('inert'), function (err) {
  if (err) {
    throw err;
  }

  server.route({
    method: 'GET',
    path: '/hello',
    handler: function (request, reply) {
      reply.file('./public/hello.html');
    }
  });
});


server.register({
  register: Good,
  options: {
    reporters: [{
      reporter: require('good-console'),
      events: {
        response: '*',
        log: '*'
      }
    }]
  }
}, function (err) {
  if (err) {
    throw err;
  }

  server.start(function () {
    server.log('info', 'Server running at: ' + server.info.uri);
  });
});
