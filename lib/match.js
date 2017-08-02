const Hapi = require('hapi');
const fs = require('fs');

const server = new Hapi.Server();
server.connection({port: process.env.PORT || 3334});

server.route({
  method: 'GET',
    path: "/{file*}",
      handler: function(req, reply) {
        const response = reply().hold();
        const id = req.query.tpid;
        response.header("Location", `http://ih.localctl.test/tpui/999-555-111/1481856725564/0/pvi?tpid=${id}&tpuid=TEST-2`);
        response.code(302);
        response.send();
      }
});

server.start((err) => {
  if (err) {
    throw err;
  }

  console.log(`Server up and running on port ${server.info.port}`);
});
