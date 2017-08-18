const Hapi = require('hapi');

const server = new Hapi.Server();
const corsHeaders = require('hapi-cors-headers');

server.connection({port: process.env.PORT || 4444});

server.ext('onPreResponse', corsHeaders);

server.route({
  method: 'POST',
  path: "/mockdh",
  handler: function(req, reply) {
    console.log("Received request " + JSON.stringify(req.payload));

    const response = {
      seatbid: [
        {
          bid: [{
            impid: "1",
            price: 5.0,
            w: 468,
            h: 60,
            adm: `<h1>HELLO ${req.payload.user.id}!</h1>`
          }]
        }
      ],
    };

    console.log(JSON.stringify(response));

    reply(response);
  }
});


server.start((err) => {
  if (err) {
    throw err;
  }

  console.log(`Server up and running on port ${server.info.port}`);
});
