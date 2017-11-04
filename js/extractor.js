$("body").empty(); // clear body

var APIBaseURL = "https://mercury.postlight.com/parser?"
var currentURL = window.location.toString();
var queryURL = APIBaseURL +
  "url=" + currentURL;
// set query api key
var apiKey = "m02LB8tNHSxBOyTfvQYIHptj6a8DCxHTd3SUQ3UT";
$.ajax({
  url: queryURL,
  dataType: "json",
  beforeSend: function(xhr) {
    xhr.setRequestHeader("x-api-key", apiKey);
  },
  success: function(data) {
    appendMainArticle(data);
    runPaginator();
  }
})

function appendMainArticle(data) {
  var title = "<h1 id='title'>" + data.title + "</h1>";
  var image = data.lead_image_url ? "<img id='leadImage' src='" + data.lead_image_url + "' alt='lead image'>" : "";
  var content = $("<div></div>");
  content.html(data.content);
  var mainArticle = $("<div id='mainArticle'></div>").append(title, image, content);
  mainArticle.css("margin", "10px");
  $("body").append(mainArticle);
}

function runPaginator() {
  var body = $("body"),
    article = $('#mainArticle');
  var PAGINATIONHEIGHT = 60;
  var screenHeight = window.innerHeight,
    articleLength = article.outerHeight(),
    articleHeight = screenHeight - PAGINATIONHEIGHT;
  // set page style
  body.css("height", screenHeight + "px").css("overflow", "hidden");
  article.css("height", articleHeight + "px").css("overflow", "hidden");
  // auto-adjust image width
  $("img").css("max-width", "100%");

  addPagination();
  // append a blank page, to make up for the last page
  var blankPage = $("<div></div>");
  blankPage.css('height', articleHeight);
  article.append(blankPage);

  function addPagination() {
    var pagination = $("<div id='pagination'></div>");
    // get total number of pages
    var totalPages = Math.ceil(parseInt(articleLength) / parseInt(articleHeight));
    for (var i = 1; i <= totalPages; i++) {
      var pageIndex = $("<a>" + i + "</a>");
      pageIndex.css("padding", "0.2em 0.5em").css("margin", "1.5px").css("background", "rgba(153, 153, 153, 0.11)");
      pagination.append(pageIndex);
    }
    pagination.css("text-align", "center").css("line-height", "40px");
    body.append(pagination);
    // bind onclick event
    pagination.find("a").each(function(i, pageIndex) {
      $(pageIndex).click(function() {
        showPage(i + 1);
      });
    });
  }

  function showPage(pageIndex) {
    var article = document.getElementById("mainArticle");
    article.scrollTop = (pageIndex - 1) * parseInt(article.offsetHeight);
  }

}
