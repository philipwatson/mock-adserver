const Hapi = require('hapi');

const server = new Hapi.Server();
const corsHeaders = require('hapi-cors-headers');

server.connection({port: process.env.PORT || 9999});

server.ext('onPreResponse', corsHeaders);

const vast = function(id, videoUrl) { return `<VAST version=\"2.0\"><Ad id=\"12345\">
<InLine><AdSystem>Adscale</AdSystem><AdTitle>${id}</AdTitle>
<Creatives><Creative><Linear><Duration>00:00:30</Duration>
<MediaFiles><MediaFile height=\"608\" width=\"1080\" type=\"video/mp4\" delivery=\"progressive\">${videoUrl}</MediaFile></MediaFiles>
</Linear></Creative></Creatives></InLine></Ad></VAST>`};

server.route({
  method: 'POST',
  path: "/1",
  handler: function(req, reply) {
    console.log("receive request for partner 101");
    const bid = {
      id: "123",
      bidid: "8234",
      seatbid: [{
        seat: "666018",
        group: 0,
        bid: [{
          id:"some id",
          impid:"1",
          price: String(Math.round(70.0 + (Math.random() * 15))),
          adid: "2822",
          adm: vast(1, "http://rmcdn.2mdn.net/Demo/vast_inspector/android.mp4"),
          crid: "ABC",
          adomain: [
            "domain1.com",
            "domain2.com"
          ],
          ext: {
            avn: "AVN",
            agn: "AGN"
          }
        }]
      }]
    };
    reply(bid);
  }
});

server.route({
  method: 'POST',
  path: "/2",
  handler: function(req, reply) {
    console.log("receive request for partner 102");
    const bid = {
      id: "123",
      bidid: "8234",
      seatbid: [{
        seat: "666018",
        group: 0,
        bid: [{
          id:"some id",
          impid:"1",
          price: String(Math.round(70.0 + (Math.random() * 30))),
          adid: "714",
          adm: vast(2, "https://ia600308.us.archive.org/24/items/Commodore_C128_Higher_Intelligence_1985_Commodore_US/Commodore_C128_Higher_Intelligence_1985_Commodore_US.mp4"),
          crid: "XYZ",
          adomain: [
            "domain1.com",
            "domain2.com"
          ],
          ext: {
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
