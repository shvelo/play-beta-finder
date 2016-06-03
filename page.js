var pushState = history.pushState,
    replaceState = history.replaceState;
history.pushState = function () {
    pushState.apply(history, arguments);
    onStateChanged();
};
history.replaceState = function () {
    replaceState.apply(history, arguments);
    onStateChanged();
};

onStateChanged();

function onStateChanged() {
    var appId = location.href.match(/id=([^&]*)/)[1];

    if (appId) {
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function (event) {
            if(event.target.readyState === 4) {
                if(event.target.response.includes("You are a tester")) {
                    showBetaSignup(appId, true);
                } else if(event.target.response.includes("Become a tester")) {
                    showBetaSignup(appId, false);
                }
            }
        };
        xhr.open("GET", 'https://play.google.com/apps/testing/' + appId, true);
        xhr.send();
    }
}

function showBetaSignup(appId, enrolled) {
    var playButton = document.querySelector('.play-button.buy-button-container'),
        betaButton = document.createElement('a');
    betaButton.href = 'https://play.google.com/apps/testing/' + appId;
    betaButton.target = "_blank";
    betaButton.innerText = enrolled? "Leave beta" : "Join beta";
    betaButton.className = "apps large play-button";
    playButton.parentNode.insertBefore(betaButton, playButton);
}