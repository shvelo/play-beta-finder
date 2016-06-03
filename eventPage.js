var appId = location.href.match(/id=([^&]*)/)[1];

if (appId) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function (event) {
        if(event.target.readyState === 4) {
            if(!event.target.response.includes("App not available for this account")) {
                showBetaSignup(appId);
            }
        }
    };
    xhr.open("GET", 'https://play.google.com/apps/testing/' + appId, true);
    xhr.send();
}

function showBetaSignup(appId) {
    var playButton = document.querySelector('.play-button.buy-button-container'),
        betaButton = document.createElement('a');
    betaButton.href = 'https://play.google.com/apps/testing/' + appId;
    betaButton.target = "_blank";
    betaButton.innerText = "Beta";
    betaButton.className = "apps large play-button";
    playButton.parentNode.insertBefore(betaButton, playButton);
}