var del = require('del');
var gulp = require('gulp');
var path = require('path');
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
var karma = require("karma");

var DIST_PATH = './src/dist/';
var GAME_ES5 = './src/dist/game.js';
var BUILD_PATH = './build';
var SCRIPTS_PATH = BUILD_PATH + '/scripts';
var SOURCE_PATH = './src';
var STATIC_PATH = './static';

var APP_PATH = './app/**/*.js';
var APP_HTML_PATH = './app/**/*.html';

var TEST_PATH = "./test/**/*.js";
var TEST_PATH_TRANSPILED = "./test/tstranspiled/*.js";
var TEST_DIST_PATH = "./src/dist/test";


var keepFiles = false;
var onlyDeleteWorkingFiles = false;

function cleanBuild() {
    if (onlyDeleteWorkingFiles) {
        del(['build/scripts/app.min.js']);
        del(['build/scripts/app.min.js.map']);
        del(['build/scripts/game.js']);
        return;
    }
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
    if (onlyDeleteWorkingFiles) {
        return;
    }
    return gulp.src(gnf(), {base: './'})
        .pipe(gulp.dest(SCRIPTS_PATH));
}

function build() {
    return gulp.src(DIST_PATH + "game.js")
        .pipe(babel({
            moduleIds: true,
            compact: true,
            presets: ["es2015"],
            plugins: ["transform-es2015-modules-commonjs"]
        }))
        .on("error", function () {
            //    NIKSKSE
            this.emit('end');
        })
        .pipe(gulp.dest(SCRIPTS_PATH));
}

function serve() {
    var options = {
        server: {
            baseDir: BUILD_PATH
        },
        open: true // Browsersync opens a browser window.
    };

    browserSync(options);

    gulp.watch(SOURCE_PATH + '/**/*.js', ['watch-js'])
        .on('change', function () {
            onlyDeleteWorkingFiles = true;
        });
    gulp.watch(APP_PATH, ['watch-js']).on('change', function () {
        onlyDeleteWorkingFiles = true;
    });
    gulp.watch(APP_HTML_PATH, ['watch-js']);

    gulp.watch(STATIC_PATH + '/**/*', ['watch-static']).on('change', function () {
        keepFiles = true;
    });

    // gulp.watch([TEST_PATH_TRANSPILED, GAME_ES5], ['runtest_watch']);
}

function buildtest() {
    return gulp
        .src(TEST_PATH)
        .pipe(plumber())
        .pipe(sourceMaps.init())
        .pipe(babel({
            moduleIds: true,
            presets: ["es2015"],
            plugins: ["transform-es2015-modules-systemjs"]
        }))
        .pipe(sourceMaps.write("./"))
        .pipe(gulp.dest(TEST_DIST_PATH));
}

function unitTest(singleRun) {
    console.log("DIRNAME:");
    console.log(__dirname);
    var server = new karma.Server({
        configFile: `${__dirname}/test/config/karma.config.js`,
        singleRun: singleRun
    });

    server.on('browser_error', function (browser, err) {
        throw err;
    });

    server.on('run_complete', function () {
        return;
    });

    server.start();
}

gulp.task("runtest", ["buildtest"], function () {
    unitTest(true);
});

gulp.task("runtest_watch", ["buildtest"], function () {
    unitTest(false);
});

gulp.task('buildtest', buildtest);
gulp.task('cleanBuild', cleanBuild);
gulp.task('copyNodeModules', copyNodeModules);
gulp.task('copyApp', ['copyNodeModules'], copyApp);
gulp.task('copyStatic', ['copyApp'], copyStatic);
gulp.task('build', ['cleanBuild', 'copyStatic'], build);
gulp.task('serve', ['build'], serve);
gulp.task('watch-js', ['build'], browserSync.reload); // Rebuilds and reloads the project when executed.
gulp.task('watch-static', browserSync.reload);

gulp.task('default', ['serve']);
