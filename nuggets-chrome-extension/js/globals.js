{
	// use let to restrict scope to variable
	let prodBaseUrl = "https://nuggets-service.herokuapp.com"
	let devBaseUrl = "http://localhost:8000"; 
	// using VAR makes it global and accessible outside of block scope!
	var NUGGETS_BASE_URL = devBaseUrl; 

	var CURRENT_NUGGET_USER = 'currentNuggetUser';
	var CURRENT_NUGGET_USER_TOKEN = 'currentNuggetUserToken';
}