'use strict';

var matter = require('gray-matter');
var filenamify = require('filenamify');
var jetpack = require('fs-jetpack');
var config = require('../../config.json');

var normalize = function (string) {
    var ret = filenamify(string, { replacement : '-' });
    return ret.trim().toLowerCase().replace(/\s+/g, '-');
};

var isMeta = function (ep) {
    return typeof ep.data.episode === 'string' && ep.data.episode.trim().toLowerCase() === 'meta';
};

var reader = {
    getFiles : function (inPath) {
        return jetpack.find(inPath, { matching : '**/*.md' });
    },
    read : function (file) {
        return jetpack.read(file, 'utf8');
    },
    write : function (obj, path, file) {
        if (!file) {
            if (isMeta(obj)) {
                path = path + '/meta/' + obj.data.filename;
            } else {
                path = path + '/episodes/' + obj.data.filename;
            }
        } else {
            path = path + '/' + file;
        }
        jetpack.write(path, obj, { atomic : true });
    }
};

function parse (string, cb) {
    // parses markdown string w/ YAML header to object
    var ret;
    try {
        return matter(string);
    } catch (err) {
        console.error(err.message);
    }
}

function parseFiles (array) {
    return array.map( function (file) {
        return parse(reader.read(file));
    });
}

function createIndex (episodes, path) {
    var index = Object.assign({ story : [], meta : [] }, config);
    try {
        episodes.forEach( function (ep) {
            if (index.story.find( function (ind) {
                return ep.episode === ind.episode;
            })) {
                throw new Error('Found two episodes with the same number: "' + ep.episode + '".');
            }
            var filename = normalize(ep.data.title) + '.json';
            ep.data.filename = filename;
            if (isMeta(ep)) {
                var id = normalize(ep.data.title);
                index.meta.push({
                    title : ep.data.title,
                    description : ep.data.description,
                    episode : 'meta:' + id,
                    id : id,
                    meta : true,
                    file : filename,
                    link : ep.data.link || ep.data.title,
                    label : ep.data.label
                });
            } else {
                index.story.push({
                    title : ep.data.title,
                    description : ep.data.description,
                    episode : Number(ep.data.episode),
                    file : filename
                });
            }
            reader.write(ep, path);
        });
        index.story.sort( function (a, b) {
            return a.episode - b.episode;
        });
        reader.write(index, path, 'index.json');
    } catch (err) {
        console.error(err.message);
    }
}

function mdToJson (inPath, outPath) {
    var eps = parseFiles(reader.getFiles(inPath));
    createIndex(eps, outPath);
}

module.exports = mdToJson;