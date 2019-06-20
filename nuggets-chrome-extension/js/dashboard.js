$(document).ready(function() {
	let currentUserId = localStorage.getItem('currentNuggetUser');
	let currentUserToken = localStorage.getItem('currentNuggetUserToken');

	if (isNaN(currentUserId)) {
		window.location.replace('login.html');
	}

	fetchNuggetsWithToken(currentUserToken, currentUserId)
		.then(data=>{ return data.json()})
	.then(jsonResponse=>displayNuggets(jsonResponse));
})

function fetchNuggetsWithToken(token, userId) {
const authHeader = 'Token ' + token;
const fetchNuggetsUrl = 'http://localhost:8000/api/v0/user/' + userId + '/review/';	
return fetch(fetchNuggetsUrl, {
  method: 'post',
  headers: {
    'Accept': 'application/json, text/plain, */*',
    'Content-Type': 'application/json',
    'Authorization': authHeader,
  },
});
}

function displayNuggets(jsonNuggets) {
for (var i = 0; i < jsonNuggets.length; i++) {
	tr = $('<tr/>');
	tr.append("<td>" + jsonNuggets[i].source + "</td>");
	tr.append("<td>" + jsonNuggets[i].content + "</td>");
	$('table').append(tr);
}
}

