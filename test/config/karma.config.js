/* global module */

module.exports = function configure(config) {
    config.set(
        {
            frameworks: ["jasmine"],
            basePath: "../../",
            files: [
                "node_modules/babel-polyfill/dist/polyfill.min.js",
                "node_modules/es6-module-loader/dist/es6-module-loader.js",
                "node_modules/systemjs/dist/system.js",
                "node_modules/phaser/build/phaser.min.js",
                "src/dist/test/mytests.spec.js",
                // "build/scripts/*.js",
                "test/config/karma.bootstrap.js",
                {
                    pattern: "src/dist/test/mytests.spec.js.map",
                    watched: false,
                    included: false
                }
            ],
            browsers: ["PhantomJS"],

            reporters: ["mocha"],
            port: 9876
        });
};
