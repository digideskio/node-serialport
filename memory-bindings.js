'use strict';

var Binding = require('./').Binding;
var port = process.env.TEST_PORT;

if (!port) {
  console.error('Please pass TEST_PORT environment variable');
  process.exit(1);
}

var defaultOpenOptions = {
  baudRate: 9600,
  dataBits: 8,
  hupcl: true,
  lock: true,
  parity: 'none',
  rtscts: false,
  stopBits: 1,
  xany: false,
  xoff: false,
  xon: false
};

var counter = 0;
function makePort() {
  counter++;
  if (counter % 1000 === 0) {
    console.log('Attempt ' + counter);
    debugger;
  }

  var binding = new Binding({disconnect: function() { throw 'disconnect' }});
  binding.open(port, defaultOpenOptions, function(err) {
    if (err) { throw err }
    binding.close(makePort);
  });
}

makePort();
