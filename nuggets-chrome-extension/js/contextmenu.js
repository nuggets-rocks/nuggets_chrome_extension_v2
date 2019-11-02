// No globals in this file  since there is no html
// to inject the js into.
function contextMenuClicked(info, tab) {
	if (!localStorage.getItem('currentNuggetUser'))
	{
		alert('Login in the chrome extension above!');
		return;
	}

	if (info.selectionText.length > 200)
	{
		alert('Nuggets must be 200 characters or less!');
		return;
	}

	createNuggets({content : info.selectionText,
	source : tab.title,
	url: tab.url});
}

// This is a copy pasta of the one in globals.js
function createNuggets(createNuggetsRequest) {
      let currentUserId = localStorage.getItem('currentNuggetUser');
      let currentUserToken = localStorage.getItem('currentNuggetUserToken');
	  const authHeader = 'Token ' + currentUserToken;

	  let prodBaseUrl = "https://nuggets-service.herokuapp.com"
	  let devBaseUrl = "http://localhost:8000"; 
	  let NUGGETS_BASE_URL = prodBaseUrl; 

	  const createNuggetUrl = 
      NUGGETS_BASE_URL + '/api/v0/user/' + 
      currentUserId + '/content/' + createNuggetsRequest.content + 
      '/source/' + createNuggetsRequest.source + 
      '/url/' + createNuggetsRequest.url;

	  const req = new XMLHttpRequest();
	  req.open("PUT", createNuggetUrl);
	  req.setRequestHeader('Authorization', authHeader);
	  req.send();
	  req.onreadystatechange=function(){
	  	if (this.readyState ==4 && this.status==200) {
	  		alert('Nugget saved! Look out for your daily reminders in the new tab.');
		} else {
			// Do nothing. The click event might be triggered multiple
			// times.
		}
	  }
}

chrome.contextMenus.create({
	"title": "Add to Nuggets",
	"contexts": ['selection'],
	"onclick": contextMenuClicked
});

// This now contains not contextMenu related stuff. Let's rename this
chrome.runtime.onMessageExternal.addListener(
  function(request, sender, sendResponse) {
      localStorage.setItem('currentNuggetUser', request.nuggetsMessage.user_id);
      localStorage.setItem('currentNuggetUserToken', request.nuggetsMessage.token);
      sendResponse({response: request.nuggetsMessage});
  });


