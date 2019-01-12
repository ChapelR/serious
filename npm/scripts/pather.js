module.exports = function () {
    'use strict';
    
    var path = require('path');
    var base = path.dirname(require.main.filename);
    return {
        base,
        sep : path.sep,
        scripts : base + path.sep,
        lib : base + path.sep + 'lib' + path.sep,
        cwd : process.cwd() + path.sep
    };
};