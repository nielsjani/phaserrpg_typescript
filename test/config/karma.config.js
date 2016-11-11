/* global module */

module.exports = function configure(config) {
    config.set(
        {
            basePath: "../..",
            files: [
                "node_modules/babel-polyfill/dist/polyfill.min.js",
                "node_modules/es6-module-loader/dist/es6-module-loader.js",
                "node_modules/systemjs/dist/system.js",
                "node_modules/phaser/dist/phaser.min.js",
                "build/scripts/game.js",
                "src/dist/test/tstranspiled/tests.js",
                "test/config/karma.bootstrap.js",
                {
                    pattern: "src/dist/test/tstranspiled/*.js.map",
                    watched: false,
                    included: false
                }
            ],
            browsers: ["PhantomJS"],
            frameworks: ["jasmine"],
            reporters: ["mocha"],
            // junitReporter: {
            //     outputDir: "src/dist/surefire-reports/",
            //     outputFile: "TEST-results.xml",
            //     suite: "habitrpg",
            //     useBrowserName: false
            // },
            port: 9876
        });
};
