$(document).ready(function() {
	let currentUserId = localStorage.getItem(CURRENT_NUGGET_USER);
	let currentUserToken = localStorage.getItem(CURRENT_NUGGET_USER_TOKEN);

	if (isNaN(currentUserId)) {
		window.location.replace('login.html');
	}

	fetchNuggetsWithToken(currentUserToken, currentUserId)
		.then(data=>{ return data.json()})
	.then(jsonResponse=>displayNuggets(jsonResponse));
})

function fetchNuggetsWithToken(token, userId) {
	const authHeader = 'Token ' + token;
	const fetchNuggetsUrl = NUGGETS_BASE_URL + '/api/v0/user/' + userId + '/review/';	
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
		$( ".card-list" ).append(createNuggetCardHtml(jsonNuggets[i])); 
	}

	if (jsonNuggets.length == 0)
	{
	 // placeholder for empty screen; 
	}
}

function createNuggetCardHtml(nugget) {

	return `<div class="card w-50">
        <div class="card-body">
          <p class="card-text">${nugget.content}</p>
          <p class="card-text"><a href>${nugget.url}</a></p>
          <p class="card-text"><small class="text-muted">3/14</small></p>
        </div>
      </div>`; 

}

