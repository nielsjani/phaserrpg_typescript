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
                "src/dist/test/tstranspiled/*.js",
                // "build/scripts/game.js",
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
            port: 9876
        });
};
