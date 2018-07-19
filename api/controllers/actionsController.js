'use strict';
const lighthouse = require('lighthouse');
const chromeLauncher = require('chrome-launcher');

function launchChromeAndRunLighthouse(url, opts, config = null) {
  return chromeLauncher.launch({
    chromeFlags: opts.chromeFlags
  }).then(chrome => {
    opts.port = chrome.port;
    return lighthouse(url, opts, config).then(results => {
      // use results.lhr for the JS-consumeable output
      // https://github.com/GoogleChrome/lighthouse/blob/master/typings/lhr.d.ts
      // use results.report for the HTML/JSON/CSV output as a string
      // use results.artifacts for the trace/screenshots/other specific case you need (rarer)
      return chrome.kill().then(() => results.lhr)
    });
  });
}

exports.check_web_accessibility = function(req, res) {
  const opts = {
    onlyCategories: ['accessibility']// check web accessibility : available options are performance, pwa, accessibility, best practice, seo
  };
  // Usage:
  launchChromeAndRunLighthouse(req.body.url, opts).then(results => {
    // Use results!
    res.json(results.categories.accessibility.score);// return check result
  });
};