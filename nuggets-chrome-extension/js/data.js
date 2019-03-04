$(document).ready(function(){
var xhr = new XMLHttpRequest();
// Random get request
xhr.open("GET", "https://jsonplaceholder.typicode.com/posts", true);
xhr.onreadystatechange = function() {
  if (xhr.readyState == 4) {
    var resp = JSON.parse(xhr.responseText);
    for (var i = 0; i < resp.length; i++) {
            tr = $('<tr/>');
            tr.append("<td>" + resp[i].id + "</td>");
            tr.append("<td>" + resp[i].title + "</td>");
            $('table').append(tr);
        }
  }
}
xhr.send();
});
