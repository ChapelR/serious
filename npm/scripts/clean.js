module.exports = function () {
    'use strict';

    var paths = require('./pather.js')();
    var config = require(paths.cwd + 'config.json');
    var jetpack = require('fs-jetpack');

    jetpack.remove(config.output + 'content');
};