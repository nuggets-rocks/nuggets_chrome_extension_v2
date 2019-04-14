// Global variables should go inside the following block.
// Local variables not meant to have global scope should be defined with let rather than var
{
	// use let to restrict scope to variable
	let prodBaseUrl = "https://nuggets-service.herokuapp.com"
	let devBaseUrl = "http://localhost:8000"; 
	// using VAR makes it global and accessible outside of block scope!
	var NUGGETS_BASE_URL = devBaseUrl; 

	var CURRENT_NUGGET_USER = 'currentNuggetUser';
	var CURRENT_NUGGET_USER_TOKEN = 'currentNuggetUserToken';
}

function createNuggets(createNuggetsRequest,onSuccess, onFailure) {
      let currentUserId = localStorage.getItem(CURRENT_NUGGET_USER);
      let currentUserToken = localStorage.getItem(CURRENT_NUGGET_USER_TOKEN);
	  const authHeader = 'Token ' + currentUserToken;

      const createNuggetUrl = 
      NUGGETS_BASE_URL + '/api/v0/user/' + 
      currentUserId + '/content/' + createNuggetsRequest.content + 
      '/source/' + createNuggetsRequest.source + 
      '/url/' + createNuggetsRequest.url;

      $.ajax({
        url: createNuggetUrl,
        type: 'GET',
        headers:{'Authorization': authHeader},
        success: onSuccess,
        error: onFailure
      });
}


