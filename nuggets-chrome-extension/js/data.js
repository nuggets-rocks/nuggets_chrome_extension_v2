$(document).ready(function(){
// first, make post request to fetch user
var http = new XMLHttpRequest();
var url = 'http://localhost:8000/api-token-auth/';
var params = 'username=shiva&password=shivarocks';
http.open('POST', url, true);
//Send the proper header information along with the request
http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

var token;

http.onreadystatechange = function() {//Call a function when the state changes.
    if(http.readyState == 4 && http.status == 200) {
        token = JSON.parse(http.responseText).token;

        alert("got token " + token);

        // Now let's fetch using this token
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

    }
}
http.send(params)
})


//alert("time for post1!");

	// var http = new XMLHttpRequest();
	// var url = 'http://localhost:8000/api-token-auth/';
	// var params = 'username=shiva&password=shivarocks';
	// http.open('POST', url, true);
	// //Send the proper header information along with the request
	// http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');


	// http.onreadystatechange = function() {//Call a function when the state changes.
	//     if(http.readyState == 4 && http.status == 200) {
	//         alert(http.responseText);
	//     }
	// }
	// http.send(params);

