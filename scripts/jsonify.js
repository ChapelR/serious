'use strict';

var config = require('../config.json');
var md2json = require('./lib/parse.js');

md2json(config.input, config.output);