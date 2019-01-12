module.exports = function () {
    'use strict';

    var jetpack = require('fs-jetpack');
    var paths = require('./pather.js')();

    if (jetpack.exists(paths.cwd + 'config.json')) {
        console.log('Please delete the `config.json` file if you really want to reinitialize your project.');
    } else {
        jetpack.copy(paths.lib + 'config.txt', './config.json', { overwrite : false });
        jetpack.copy(paths.lib + 'example.md', './src/example.md', { overwrite : false });
        jetpack.copy(paths.lib + 'about.md', './src/meta/about.md', { overwrite : false });
    }
};