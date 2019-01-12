#! /usr/bin/env node

var main = require('../index.js');
var args = process.argv.slice();

args.splice(0, 2);

var directive = args[0] ? args[0].trim().toLowerCase() : 'help';

switch (directive) {
    case 'init':
        main.init();
        console.log('Serious story initialized.');
        break;
    case 'build':
        main.build();
        console.log('Build complete.');
        if (args[1] && args[1].trim().toLowerCase() === 'serve') {
            main.serve();
            console.log('Serving to localhost:8000.');
        }
        break;
    case 'clean':
        main.clean();
        break;
    case 'serve':
        if (args[1] && args[1].trim().toLowerCase() === 'build') {
            main.build();
            console.log('Build complete.');
        }
        main.serve();
        console.log('Serving to localhost:8000.');
        break;
    default:
        console.log(`Serious CLI usage: serious [action]

            init  : creates a config.json file and example posts
            build : creates the web page from the source files
            serve : starts a localhost server and opens the web page
            clean : cleans the output directory (eg: deletes the built web page)

            You can run build and serve together, eg 'serious build serve' to do both at once.`);
}