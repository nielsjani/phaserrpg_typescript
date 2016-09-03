var del = require('del');
var gulp = require('gulp');
var path = require('path');
var argv = require('yargs').argv;
var source = require('vinyl-source-stream');
var buffer = require('gulp-buffer');
var uglify = require('gulp-uglify');
var exorcist = require('exorcist');
var babelify = require('babelify');
var browserify = require('browserify');
var browserSync = require('browser-sync');
var htmlmin = require("gulp-htmlmin");
var templateCache = require("gulp-angular-templatecache");
var addStream = require("add-stream");
var sourceMaps = require("gulp-sourcemaps");
var plumber = require("gulp-plumber");
var ngAnnotate = require("gulp-ng-annotate");
var rename = require("gulp-rename");
var concat = require("gulp-concat");
var babel = require("gulp-babel");
var gnf = require('gulp-npm-files');

var PHASER_PATH = './node_modules/phaser/build/';
var DIST_PATH = './src/dist/';
var BUILD_PATH = './build';
var SCRIPTS_PATH = BUILD_PATH + '/scripts';
var SOURCE_PATH = './src';
var STATIC_PATH = './static';
var APP_PATH = './app/**/*.js';
var APP_HTML_PATH = './app/**/*.html';
var ENTRY_FILE = SOURCE_PATH + '/index.js';
var OUTPUT_FILE = 'game.js';

var keepFiles = false;

function isProduction() {
    return argv.production;
}

function cleanBuild() {
    if (!keepFiles) {
        del(['build/**/*.*']);
    } else {
        keepFiles = false;
    }
    return;
}

function copyStatic() {
    return gulp.src(STATIC_PATH + '/**/*')
        .pipe(gulp.dest(BUILD_PATH));
}

function copyPhaser() {

    var srcList = ['phaser.min.js'];

    if (!isProduction()) {
        srcList.push('phaser.map', 'phaser.js');
    }

    srcList = srcList.map(function (file) {
        return PHASER_PATH + file;
    });

    return gulp.src(srcList)
        .pipe(gulp.dest(SCRIPTS_PATH));

}

function copyApp() {
    return gulp
        .src(APP_PATH)
        .pipe(addStream.obj(templates()))
        .pipe(plumber())
        .pipe(sourceMaps.init())
        .pipe(babel({
            moduleIds: true,
            compact: true,
            presets: ["es2015"],
            plugins: ["transform-es2015-modules-systemjs"]
        }))
        .pipe(concat("app.js"))
        .pipe(ngAnnotate())
        .pipe(uglify())
        .pipe(rename({
            suffix: ".min"
        }))
        .pipe(sourceMaps.write("./"))
        .pipe(gulp.dest(SCRIPTS_PATH))
        ;
}

function templates() {
    return gulp
        .src(APP_HTML_PATH, {base: "app"})
        .pipe(htmlmin({
            removeComments: true,
            collapseWhitespace: true,
            conservativeCollapse: true,
            preserveLineBreaks: true,
            collapseBooleanAttributes: true,
            removeEmptyAttributes: true,
            removeTagWhitespace: true,
            keepClosingSlash: true,
            quoteCharacter: "\""
        }))
        .pipe(templateCache("app.templates.run.js", {
            templateHeader: "export default $templateCache => {\n\"ngInject\";\n",
            templateFooter: "\n};",
            transformUrl(url) {
                var pathpart = "phaserRpgTypescript";
                return url.substring(url.indexOf(pathpart) + pathpart.length + 1);
            }
        }));
}

function copyNodeModules() {
    return gulp.src(gnf(), {base: './'})
        .pipe(gulp.dest(SCRIPTS_PATH));
}

function build() {
    return gulp.src(DIST_PATH + "game.js")
        .pipe(gulp.dest(SCRIPTS_PATH));

}

function serve() {

    var options = {
        server: {
            baseDir: BUILD_PATH
        },
        open: true // Change it to true if you wish to allow Browsersync to open a browser window.
    };

    browserSync(options);

    // Watches for changes in files inside the './src' folder.
    gulp.watch(SOURCE_PATH + '/**/*.js', ['watch-js']);

    // Watches for changes in files inside the './static' folder. Also sets 'keepFiles' to true (see cleanBuild()).
    gulp.watch(STATIC_PATH + '/**/*', ['watch-static']).on('change', function () {
        keepFiles = true;
    });

}

gulp.task('cleanBuild', cleanBuild);
gulp.task('copyNodeModules', copyNodeModules);
gulp.task('copyApp', ['copyNodeModules'], copyApp);
gulp.task('copyStatic', ['copyApp'], copyStatic);
gulp.task('build', ['cleanBuild', 'copyStatic'], build);
gulp.task('fastBuild', build);
gulp.task('serve', ['build'], serve);
gulp.task('watch-js', ['fastBuild'], browserSync.reload); // Rebuilds and reloads the project when executed.
gulp.task('watch-static', browserSync.reload);

gulp.task('default', ['serve']);
