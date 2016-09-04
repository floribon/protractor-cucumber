var protractor = require('protractor');

var World = (function(seleniumAddress, options) {

  //if (!seleniumAddress) throw new Error('Please provide a server url');

  var desiredCapabilities = options.desiredCapabilities || {};
  var browserOpt = options.browser || desiredCapabilities.browser || "chrome";
  var timeout = options.timeout || 100000;

  function World() {
    var capabilities = protractor.Capabilities[browserOpt]().merge(desiredCapabilities);
    var driver = new protractor.Builder()
    .usingServer(seleniumAddress)
    .withCapabilities(capabilities)
    .build();

    driver.manage().timeouts().setScriptTimeout(timeout);

    var browser = protractor.ProtractorBrowser.wrapDriver(driver);

    this.browser = browser;
    this.protractor = protractor;
    this.by = protractor.ProtractorBrowser.By;

    if (options.assert) this.assert = options.assert;
    if (options.baseUrl) this.baseUrl = options.baseUrl;
    if (options.properties) this.properties = options.properties;

    this.quit = function(callback) {
      return driver.quit().then(function() {
        if (callback) { callback(); }
      });
    };
  }

  return World;
});

module.exports.world = World;
