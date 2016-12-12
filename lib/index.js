"use strict"

const Hapi = require('hapi');

const server = new Hapi.Server();
server.connection({port: process.env.PORT || 3333});


const vast = `<VAST version=\"2.0\"><Ad id=\"12345\">
<InLine><AdSystem>Adscale</AdSystem><AdTitle>Video Ad</AdTitle>
<Creatives><Creative><Linear><Duration>00:00:30</Duration>
<MediaFiles><MediaFile height=\"608\" width=\"1080\" type=\"video/mp4\" delivery=\"progressive\">http://rmcdn.2mdn.net/Demo/vast_inspector/android.mp4</MediaFile></MediaFiles>
</Linear></Creative></Creatives></InLine></Ad></VAST>`;

server.route({
  method: 'POST',
  path: "/",
  handler: function(req, reply) {
    console.log(req.payload);
    const bid = {
      id: "123",
      bidid: "8234",
      seatbid: [{
        seat: "666018",
        group: 0,
        bid: [{
          id:"some id",
          impid:"1",
          price: "500",
          adid: "2822",
          adm: vast,
          crid: "Video Creative",
          adomain: [
            "domain1.com",
            "domain2.com"
          ],
          ext: {
            pay: "234.56",
            avn: "AVN",
            agn: "AGN"
          }
        }]
      }]
    };
    reply(bid);
  }
});

server.start((err) => {
  if (err) {
    throw err;
  }
  
  console.log(`Server up and running on port ${server.info.port}`);
});
