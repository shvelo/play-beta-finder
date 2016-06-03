var headID = document.getElementsByTagName("head")[0];
var newScript = document.createElement('script');
newScript.type = 'text/javascript';
newScript.src = chrome.extension.getURL('page.js');
headID.appendChild(newScript);