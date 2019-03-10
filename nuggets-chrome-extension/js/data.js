$(document).ready(function(){
const authUrl = 'http://localhost:8000/api-token-auth/';

fetch(authUrl, {
  method: 'post',
  headers: {
    'Accept': 'application/json, text/plain, */*',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({username: 'shiva', password: 'shivarocks'})
}).then(res=>res.json())
  .then((tokenJson) => {
  	// return promise of nuggets
  	return fetchNuggetsWithToken(tokenJson.token);
  })
.then(data=>{ return data.json()})
//.then(resp=> alert(JSON.stringify(resp)));
.then(jsonResponse=>displayNuggets(jsonResponse));
})

function fetchNuggetsWithToken(token) {
const authHeader = 'Token ' + token;
const fetchNuggetsUrl = 'http://localhost:8000/api/v0/user/1/nuggets/';	
return fetch(fetchNuggetsUrl, {
  method: 'get',
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

