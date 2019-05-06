$(document).ready(function(){
function initialize() {
  if (localStorage.getItem('currentNuggetUser')) {
    // Already logged in.
    alert("Already logged in! Woohoo");
  } else {
    // Redirect to the login page in the new tab.
    let loginInNewTab = NUGGETS_BASE_URL + "/login";
    $("#register-button2-a").attr("href", loginInNewTab);
    $("#go-to-login").attr("href", loginInNewTab);
  }
}

function getCurrentUser() {
     return localStorage.getItem(CURRENT_NUGGET_USER);
    //localStorage.setItem(CURRENT_NUGGET_USER, null);
}

function saveCurrentUserInLocalStorage(user) {
    localStorage.setItem(CURRENT_NUGGET_USER, JSON.stringify(user))
}

function validateLogin() {  
  var currentUser = getCurrentUser();
  if (currentUser)
  {
    goToNuggetPage();
  }
  else
  {
    $('#login-email').focus();
  }
}

function validateLoginForDashboard() {
  var currentUser = getCurrentUser();
  if (currentUser)
  {
    goToDashboardPage();
  }
  else
  {
    $('#login-email').focus();
  }
}

function goToNuggetPage()
{
  window.location.replace('nuggets.html');
}

function goToWelcomePage()
{
  window.location.replace('welcome.html');
}

function goToDashboardPage() {
  window.location.replace('dashboard.html');
}

initialize();

function attemptLogin()
{
  $('#login-button').prop('disabled', true);
  if ($('#login-email').val() == "" || $('#login-password').val() == "")
  {
    $('#login-error-1').css('display','block');
    $('#login-error-2').css('display','none');
    $('#login-password-message').css('display','none');
    $('#login-email').focus();
  }
  else
  {
    $('#login-error-1').css('display','none');
    $('#login-error-2').css('display','none');
    $('#login-password-message').css('display','none');

    const loginUrl = NUGGETS_BASE_URL + '/login/user-name/' + $('#login-email').val() + '/password/' + $('#login-password').val();

    // TODO(shiva): Handle failure/error cases.
    fetch(loginUrl)
    .then(res=>res.json())
    .then(userIdJson => {
      localStorage.setItem(CURRENT_NUGGET_USER, userIdJson.user_id);
      localStorage.setItem(CURRENT_NUGGET_USER_TOKEN, userIdJson.token);
      // alert('all good' + userIdJson.user_id + '?');
      window.location.replace('nuggets.html');
    });

    // $.get(loginUrl,
    //   function(response, status) {
          
    //       saveCurrentUserInLocalStorage(response);
    //       alert('success!' + JSON.parse(response).user_id + ' token is ' + JSON.parse(response).token);
    //       //goToNuggetPage();
    //   },
    //   function(user, error) {
    //     $('#login-error-2').css('display','block');
    //     $('#login-email').focus();
    //   });

  }
  $('#login-button').prop('disabled', false);
}

$('#login-button').click(function()
{
  attemptLogin();
});

$('#login-password').keyup(function(e)
{
  if (e.which == 13)
  {
    attemptLogin();
  }
});

$('#login-forgot-password-icon').click(function()
{
  $('#login-error-1').css('display','none');
  $('#login-error-2').css('display','none');
  var email = $('#login-email').val();
  if (validateEmail(email))
  {
    Parse.User.requestPasswordReset(email, {
    success: function() {
      $('#login-password-message').css('color','green');
      $('#login-password-message').html("Instructions to reset your password were sent to " + email);
      $('#login-password-message').css('display','block');
    },
    error: function(error) {
      $('#login-password-message').css('color','red');
      $('#login-password-message').html(error.message);
      $('#login-password-message').css('display','block');
      $('#login-email').focus();
    }
    });
  }
  else
  {
    $('#login-error-2').css('display','block');
    $('#login-email').focus();
  }
});

function attemptRegister()
{
  $('#register-button').prop('disabled', true);
  if ($('#register-name').val() == "")
  {
    $('#register-error-1').css('display','block');
    $('#register-error-2').css('display','none');
    $('#register-error-3').css('display','none');
    $('#register-error-4').css('display','none');
    $('#register-name').focus();
  }
  else if (!validateEmail($('#register-email').val()))
  {
    $('#register-error-1').css('display','none');
    $('#register-error-2').css('display','block');
    $('#register-error-3').css('display','none');
    $('#register-error-4').css('display','none');
    $('#register-email').focus();
  }
  else if ($('#register-password').val().length < 6)
  {
    $('#register-error-1').css('display','none');
    $('#register-error-2').css('display','none');
    $('#register-error-3').css('display','block');
    $('#register-error-4').css('display','none');
    $('#register-password').focus();
  }
  else
  {
    $('#register-error-1').css('display','none');
    $('#register-error-2').css('display','none');
    $('#register-error-3').css('display','none');
    $('#register-error-4').css('display','none');
    createNewUser($('#register-email').val(),$('#register-password').val());
  }
  $('#register-button').prop('disabled', false);
}

// Redirects to dashboard on success
function createNewUser(username, password) {
const registerUrl = NUGGETS_BASE_URL +'/register/user-name/' + username + '/password/' + password;

fetch(registerUrl)
.then(res=>res.json())
    .then((userIdJson) => {
      // return promise of nuggets
      localStorage.setItem(CURRENT_NUGGET_USER, userIdJson.user_id);
      // Now get token
        const authUrl = NUGGETS_BASE_URL +'/api-token-auth/';
        return fetch(authUrl, {
          method: 'post',
          headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({username: username, password: password})
        });
    })
    .then(res=>res.json())
          .then((tokenJson) => {
            localStorage.setItem(CURRENT_NUGGET_USER_TOKEN, tokenJson.token);
            window.location.replace('nuggets.html');
          });
}

$('#register-button').click(function()
{
  attemptRegister();
});

$('#register-button2').click(function()
{
  alert('poppop');
});

$('#register-password').keyup(function(e)
{
  if (e.which == 13)
  {
    attemptRegister();
  }
});

$('#go-to-register').click(function()
{
  $('#login-div').css('display','none');
  $('#register-div').css('display','block');
  $('#register-name').focus();
});

$('#go-to-login').click(function()
{
  $('#register-div').css('display','none');
  $('#login-div').css('display','block');
  $('#login-email').focus();
});

});
