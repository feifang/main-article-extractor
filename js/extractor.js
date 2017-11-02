$("body").empty(); // clear body
// TODO: Add loading animation

var APIBaseURL = "https://mercury.postlight.com/parser?"
var currentURL = window.location.toString();
// var queryURL = APIBaseURL +
//   "url=https://www.theguardian.com/politics/2015/may/28/david-cameron-sets-off-on-mission-to-win-over-european-leaders";
var queryURL = APIBaseURL +
  "url=" + currentURL;
// set query api key
var apiKey = "m02LB8tNHSxBOyTfvQYIHptj6a8DCxHTd3SUQ3UT";
$.ajax({
  url: queryURL,
  dataType: "json",
  beforeSend: function(xhr) {
    xhr.setRequestHeader('x-api-key', apiKey);
  },
  success: function(data) {
    appendMainArticle(data);
  }
})

function appendMainArticle(data) {
  var title = "<h1>" + data.title + "</h1>";
  var image = "<img src='" + data.lead_image_url + "' alt='lead image'>";
  var content = document.createElement("div");
  content.innerHTML = data.content;
  $("body").append(title, image, content);
}
