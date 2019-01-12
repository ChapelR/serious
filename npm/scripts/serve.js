module.exports = function () {
    'user strict';

    var paths = require('./pather.js')();
    var config = require(paths.cwd + 'config');
    var exec = require('child_process').exec;

    var cmd = "http-server -a localhost -p 8000 -c-1";
    var child = exec(cmd,
      function(err, stdout, stderr) {
        if (err) {
            throw err;
        } else {
            console.log(stdout);
        }
    });
    require('opn')("http://localhost:8000/" + config.output);
};