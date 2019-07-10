firebase.initializeApp({
    messagingSenderId: '262650303733'
});


if('Notification' in window){
    var messaging = firebase.messaging();

    if (Notification.permission === 'granted') {
        subscribe();
    }

    $('#subscribe').on('click', function () {
       subscribe();
    });
}


function subscribe() {
    messaging.requestPermission()
        .then(function () {
            messaging.getToken()
                .then(function (currentToken) {
                    console.log(currentToken);
                    if (currentToken) {
                        sendTokenToServer(currentToken);
                    } else {
                        console.warn("No token");
                        setTokenSentToServer(false);
                    }
                })
                .catch(function (err) {
                    console.warn('error while get token', err);
                    setTokenSentToServer(false);
                });
        })
        .catch(function (err) {
            console.warn('No permission for display notification', err)
        });
    console.log('OK');
}

function sendTokenToServer(currentToken) {
    if (!isTokenSendToServer(currentToken)) {
        console.log('Sending token to server');
        var url = '';
        $.post(url, {
            token: currentToken
        });
        setTokenSentToServer(currentToken);
    } else {
        console.log('Token already sent to server');
    }
}

function setTokenSentToServer(currentToken) {
    window.localStorage.setItem(
        'sentFirebaseMessagingToken',
        currentToken ? currentToken : ''
    );
}