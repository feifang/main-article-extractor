$("body").on("click", "#mainArticle", function(event) { // attach events to dynamic html elements
  var word = getSelectedText().trim();
  if (word.length > 0) { // double click or click and drag to select some text
    console.log("word", word);
    var dataFields = ["audio", "definition", "pronunciation"];
    getShanbayTranslation(word, dataFields);
  }
});

function getSelectedText() {
  if (window.getSelection) {
    return window.getSelection().toString();
  } else if (document.selection) { // IE
    return document.selection.createRange().text;
  }
  return "";
}

function getShanbayTranslation(word, fields) {
  var wordAPI = "https://api.shanbay.com/bdc/search/?word=";
  var query = wordAPI + word;
  $.get(query, function(data) {
    if (data.status_code === 0) { // success
      var wordInfo = data.data;
      var result = {};
      fields.forEach(function(field) {
        result[field] = wordInfo[field];
      })
      console.log("result", result);
      // show infobox

    } else if (data.status_code === 1) { // failed: word not found
      console.log("未找到单词"); // show notification
    } else {
      console.log("error");
    }

  });
}
