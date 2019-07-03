// Global variables should go inside the following block.
// Local variables not meant to have global scope should be defined with let rather than var
{
	// use let to restrict scope to variable
	let prodBaseUrl = "https://nuggets-service.herokuapp.com"
	let devBaseUrl = "http://localhost:8000"; 
	// using VAR makes it global and accessible outside of block scope!
  // NOTE: This not not injected into contextmenu.js and so the url
  // has to be updated manually! Please do so when switching env.
	var NUGGETS_BASE_URL = prodBaseUrl; 

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
        type: 'PUT',
        headers:{'Authorization': authHeader},
        success: onSuccess,
        error: onFailure
      });
}


