var gulp = require('gulp'),
    rename = require('gulp-rename'),
    del = require('del'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    clean = require('gulp-clean-css'),
    autoprefix = require('gulp-autoprefixer'),
    jshint = require('gulp-jshint');

function processScripts (dir, out, name) {
    return gulp.src(dir)
        .pipe(concat(name))
        .pipe(uglify().on('error', function(e){ console.log(e); }))
        .pipe(gulp.dest(out));
}

function processStyles (dir, out, name) {
    return gulp.src(dir)
        .pipe(concat(name))
        .pipe(clean())
        .pipe(autoprefix())
        .pipe(gulp.dest(out));
}

// clean
function cleanCDN () {
    return del('./cdn/**/*');
}

// build functions
function buildScripts () {
    var path = './publish/scripts/';
    var scriptArray = [
        'ui.js',
        'url.min.js',
        'storage.js',
        'events.js',
        'renderer.js',
        'recent.js',
        'load.js',
        'menu.js'
    ].map( function (file) {
        return path + file;
    });
    return processScripts(scriptArray, './cdn', 'serious.min.js');
}

function buildStyles () {
    var path = './publish/styles/';
    var styleArray = [
        'loader.css',
        'sidebar.css',
        'footer.css',
        'md.css',
        'other.css'
    ].map( function (file) {
        return path + file;
    });
    return processStyles(styleArray, './cdn', 'serious.min.css');
}

// tasks
gulp.task('clean', cleanCDN);
gulp.task('scripts', buildScripts);
gulp.task('styles', buildStyles);
gulp.task('files', gulp.parallel('scripts', 'styles'));
gulp.task('build', gulp.series('clean', 'files'));