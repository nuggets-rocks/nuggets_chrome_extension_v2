To install the extension:
1. Type chrome://extensions into the chrome address bar
2. Flip on the developer mode radio on the top right hand corner
3. Click on "Load unpacked" and select the folder nuggets-chrome-extension (the folder containing manifest.json) from your local copy
4. Once you hit select, the nuggets icon should be available in the browser toolbar
5. Anytime you hit a new tab you should be able to see a list of "nuggets" (they are currently fetched via a GET request from https://jsonplaceholder.typicode.com/posts). Not that only one chrome extension can 'capture' the new tab flow so if you have momentum etc. installed you might not be able to see the behavior till you disable momentum.
6. By clicking on the extension you should be able to see the UI to add a nugget (the existing flows don't work yet since the 'auth' takes over). 
