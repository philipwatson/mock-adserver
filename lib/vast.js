"use strict"

const Hapi = require('hapi');
const fs = require('fs');

const server = new Hapi.Server();
server.connection({port: process.env.PORT || 3333});

const vast = fs.readFileSync("lib/vast.xml", {encoding:"UTF-8"});
//console.log(vast);

server.route({
  method: 'GET',
  path: "/",
  handler: function(req, reply) {
    console.log(req.payload);
    var response = reply(vast).hold(); 
    response.type("application/xml");
    let origin = req.headers.origin;
    if (origin) {
      response.header("Access-Control-Allow-Origin", origin);
      response.header("Access-Control-Allow-Credentials", "true");
      response.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    }
    response.send();
  }
});

server.start((err) => {
  if (err) {
    throw err;
  }
  
  console.log(`Server up and running on port ${server.info.port}`);
});
