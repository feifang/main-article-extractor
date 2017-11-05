/*
Modified from https://chromium.googlesource.com/chromium/src/+/master/chrome/common/extensions/docs/examples/api/browserAction/make_page_red/background.js
 */

// Called when the user clicks on the browser action.
chrome.browserAction.onClicked.addListener(function(tab) {
  chrome.tabs.executeScript(null, {
    file: "lib/jquery.min.js" // load jQuery on demand
  }, function() {
    chrome.tabs.executeScript(null, { // extract main article
      file: "js/extractor.js" // path should start from root
    });
    chrome.tabs.executeScript(null, { // enable English word translation
      file: "js/translater.js"
    });
  });
});
