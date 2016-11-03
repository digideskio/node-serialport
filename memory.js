'use strict';

var SerialPort = require('./');
var port = process.env.TEST_PORT;

if (!port) {
  console.error('Please pass TEST_PORT environment variable');
  process.exit(1);
}

var counter = 0;

function startPromise() {
  var serialPort;
  return new Promise((resolve, reject) => {
    counter++;
    if (counter % 1000 === 0) {
      console.log('Attempt ' + counter);
      // global.gc();
      // console.log(process.memoryUsage());
      // heapdump.writeSnapshot();
      debugger;
    }
    var options = {
      baudrate: 115200,
      autoOpen: false
    };
    serialPort = new SerialPort(port, options);
    serialPort.open(err => err ? reject(err) : resolve());
  })
  .then(() => {
    return new Promise((resolve, reject) => {
      serialPort.close(err => {
        serialPort.removeAllListeners();
        err ? reject(err) : resolve();
      })
    });
  })
  .then(startPromise);
}

debugger;
startPromise().then(function() {
  process.exit(0);
}, function(err) {
  console.error(err);
  process.exit(1);
});
