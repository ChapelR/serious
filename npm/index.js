(function () {
    'use strict';

    var clean = require('./scripts/clean.js');
    var jsonify = require('./scripts/jsonify.js');
    var init = require('./scripts/init.js');
    var serve = require('./scripts/serve.js');

    function build () {
        clean();
        jsonify();
    }

    function fullInit () {
        init();
        clean();
        jsonify();
    }

    function install () {
        fullInit();
        serve();
    }

    function buildAndServe () {
        build();
        serve();
    }

    module.exports = {
        init : install,
        clean,
        build,
        serve,
        buildAndServe
    };
}());