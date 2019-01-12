module.exports = function () {
    'use strict';

    var config = require('../config.json');
    var md2json = require('./lib/parse.js');
    var jetpack = require('fs-jetpack');
    var paths = require('./pather.js')();

    var idx = jetpack.read(paths.lib + 'index.tpl', 'utf8');

    idx = idx.replace('/% description %/', config.description || '');
    jetpack.write(config.output + '/index.html', idx, { atomic : true });

    jetpack.copy(paths.lib + '/theme.txt', config.output + '/theme.css', { overwrite : true });

    md2json(config.input, config.output + '/content');
};