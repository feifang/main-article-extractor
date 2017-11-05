$(function() {
  createInfobox();

  $("body").on("click", "#mainArticle", function(event) { // attach events to dynamic html elements
    var word = getSelectedText().trim();
    if (word.length > 0) { // double click or click and drag to select some text
      // data fields to retrieve
      var dataFields = ["content", "audio", "definition", "pronunciation"];
      getShanbayTranslation(word, dataFields, event.pageX, event.pageY);
    } else { // single click or nothing is selected
      if ($("#infobox").hasClass("active")) {
        hideInfobox();
      }
    }
  });

  $("body").on("click", "#pagination", function(event) {
    hideInfobox();
  });

  function getSelectedText() {
    return window.getSelection().toString();
  }

  function getShanbayTranslation(word, fields, x, y) {
    var wordAPI = "https://api.shanbay.com/bdc/search/?word=";
    var query = wordAPI + word;
    $.get(query, function(data) {
      if (data.status_code === 0) { // success
        var wordInfo = data.data;
        var result = {};
        fields.forEach(function(field) {
          result[field] = wordInfo[field];
        })
        // show translation
        showInfobox(result, x, y);
      } else if (data.status_code === 1) { // failed: word not found
        showInfobox("未找到单词", x, y); // show notification 
      } else {
        console.log("error");
      }

    });
  }

  function createInfobox() {
    var infobox = $("<div id='infobox'></div>");
    var screenWidth = window.innerWidth;
    $("body").append(infobox);
    infobox.css("display", "none")
      .css("position", "absolute")
      .css("z-index", 100)
      .css("padding", "10px")
      .css("background", "white")
      .css("border", "1px solid #000")
      .css("max-width", function() { // set max width to 400px or 0.7 * screenWidth (whichever smaller)
        return 0.7 * screenWidth > 400 ? "400px" : 0.7 * screenWidth + "px";
      });
  }

  function showInfobox(data, x, y) {
    var infobox = $("#infobox");
    var info = "";
    infobox.addClass("active");
    // add infobox content
    if (typeof data === "string") { // word not found
      info = data;
    } else if (typeof data === "object") { // show word translation
      var audioIconURL = chrome.extension.getURL('audio.png');
      info = "<b>" + data.content + "</b>" + "<hr></hr>";
      info += "<p style='white - space: pre;'>" + data.definition.trim() + "</p>";
      info += '<p><img src=' + audioIconURL + ' onclick="var audio = document.createElement(\'audio\');audio.setAttribute(\'src\',\'' + data.audio + '\');audio.play();">' + " 发音： " + "/" + data.pronunciation + "/" + "</p>";
      console.log("data audio URL", data.audio);
    }
    infobox.html(info);
    // set infobox position
    var screenWidth = window.innerWidth;
    var screenHeight = window.innerHeight;
    var boxWidth = infobox.outerWidth();
    var boxHeight = infobox.outerHeight();
    var boxX = x;
    var boxY = y - boxHeight - 15;
    if (screenWidth - boxX < boxWidth) {
      var offset = boxWidth - (screenWidth - boxX);
      boxX = boxX - offset - 25;
    }
    if (boxY < 0) {
      var offset = -boxY;
      boxY = boxY + offset + 15;
    }

    infobox.css("display", "block")
      .css("left", boxX + "px")
      .css("top", boxY + "px");
  }

  function hideInfobox() {
    var infobox = $("#infobox");
    infobox.removeClass("active");
    infobox.css("display", "none");
    infobox.empty();
  }

});
