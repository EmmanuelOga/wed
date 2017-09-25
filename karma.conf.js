// Karma configuration
// Generated on Fri Sep 08 2017 08:57:28 GMT-0400 (EDT)

// This is a middleware that just serves empty files for fake css files we use
// in testing (/a.css, /b.css, etc.)
function makeServeMiddleware(/* config */) {
  return function handle(req, resp, next) {
    if (/^\/.*\.css$/.test(req.url)) {
      resp.end("");
    }
    else {
      next();
    }
  };
}

module.exports = function(config) {
  config.set({
    basePath: "",
    middleware: ["serve-fake-css-files"],
    plugins: [
      "karma-*", // This is the default, which we need to keep here.
      { "middleware:serve-fake-css-files": ["factory", makeServeMiddleware] },
    ],
    frameworks: ["requirejs", "mocha", "chai"],
    files: [
      "build/standalone/requirejs-config.js",
      // Get it straight from the source, as it does not need compilation.
      "lib/tests/karma-main.js",
      { pattern: "build/standalone/lib/**/*.@(js|map|xml|html|json)",
        included: false },
      { pattern: "build/schemas/**/*.@(js|json)", included: false },
      { pattern: "node_modules/sinon/pkg/sinon.js", included: false },
      { pattern: "node_modules/sinon-chai/lib/sinon-chai.js", included: false },
    ],
    exclude: [],
    preprocessors: {},
    reporters: ["progress"],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: false,
    browsers: ["ChromeHeadless"],
    singleRun: false,
    concurrency: Infinity
  });
};