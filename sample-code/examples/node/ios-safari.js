"use strict";

require("./helpers/setup");

var wd = require("wd"),
    _ = require('underscore'),
    serverConfigs = require('./helpers/appium-servers'),
    actions = require("./helpers/actions");

wd.addPromiseChainMethod('swipe', actions.swipe);

describe("ios safari", function () {
  this.timeout(300000);
  var driver;
  var allPassed = true;

  before(function () {
    var serverConfig = process.env.SAUCE ?
      serverConfigs.sauce : serverConfigs.local;
    driver = wd.promiseChainRemote(serverConfig);
    require("./helpers/logging").configure(driver);

    var desired = _.clone(require("./helpers/caps").ios81);
    desired.browserName = 'safari';
    if (process.env.SAUCE) {
      desired.name = 'ios - safari';
      desired.tags = ['sample'];
    }
    return driver.init(desired);
  });

  after(function () {
    // return driver
    //   .quit()
    //   .finally(function () {
    //     if (process.env.SAUCE) {
    //       return driver.sauceJobStatus(allPassed);
    //     }
    //   });
  });

  afterEach(function () {
    allPassed = allPassed && this.currentTest.state === 'passed';
  });


  it("should get the url", function () {
    return driver
      .get('https://devjobs.wirkn.com')
      .sleep(1000)
      // .waitForElementByName('q', 5000)
      //   .sendKeys('sauce labs')
      //   .sendKeys(wd.SPECIAL_KEYS.Return)
      // .sleep(1000)
      .title().should.eventually.equal('Wirkn Jobs');
  });

  it("should go to a job and go back to jobs list", function () {
    var action = new wd.TouchAction();
    action
      .press({x: 0, y: 340})
      .wait(800)
      .moveTo({x: 220, y:340 })
      .release();
    return driver
      .waitForElementByCss('#main-wrapper > div > div.col-md-8.no-padding-mobile > table > tbody > tr:nth-child(1)',5000)
      .elementByCss('#main-wrapper > div > div.col-md-8.no-padding-mobile > table > tbody > tr:nth-child(1)', 500)
      .click()
      .sleep(1000)
      .context("NATIVE_APP")
      .performTouchAction(action);

  })

  it('should scroll down to view more jobs', function () {
    var action = new wd.TouchAction();
    action
      .press({x: 187, y: 600})
      .wait(800)
      .moveTo({x: 187, y: 200})
      .release();
  // return this.performTouchAction(action)
    return driver
      .context("NATIVE_APP")
      .performTouchAction(action)
      .performTouchAction(action)
      // .performTouchAction(action)
      // .performTouchAction(action)
      // .performTouchAction(action)
      // .performTouchAction(action)
      // .performTouchAction(action)
      // .performTouchAction(action)
      // .performTouchAction(action)
      // .performTouchAction(action)
      //.waitForElementByXpath("//*[@id=\"main-wrapper\"]/div/div[1]/table/tbody/tr[1]", 5000)
      // .swipe({ startX: 50, startY: 0, endX: 50,  endY: 300, duration: 800 });
  })

  // it("should delete cookie passing domain and path", function () {
  //   var complexCookieDelete = function(name, path, domain) {
  //     return function() {
  //       path = path || '|';
  //       return driver.setCookie({name: name, value: '', path: path, 
  //         domain: domain, expiry: 0});        
  //     };
  //   };

  //   return driver
  //     .get('http://en.wikipedia.org')
  //     .waitForElementByCss('.mediawiki', 5000)
  //     .allCookies() // 'GeoIP' cookie is there
  //     .deleteCookie('GeoIP') 
  //     .allCookies() // 'GeoIP' is still there, because it is set on
  //                   // the .wikipedia.org domain
  //     .then(complexCookieDelete('GeoIP', '/', '.wikipedia.org'))
  //     .allCookies() // now 'GeoIP' cookie is gone
  //     .sleep(1000);
  // });

});
