/*
Modified from https://chromium.googlesource.com/chromium/src/+/master/chrome/common/extensions/docs/examples/api/browserAction/make_page_red/background.js
 */

// Called when the user clicks on the browser action.
chrome.browserAction.onClicked.addListener(function(tab) {
  // alert('Extracting main article of ' + tab.url + ' for you.');
  chrome.tabs.executeScript(null, {
    file: "lib/jquery.min.js" // load jquery 
  }, function() {
    chrome.tabs.executeScript(null, {
      file: "js/extractor.js" // path should start from root
    });
  });
});
