module.exports = function () {
    'use strict';

    var config = require('../config.json');
    var jetpack = require('fs-jetpack');

    jetpack.remove(config.output + '/content');
};