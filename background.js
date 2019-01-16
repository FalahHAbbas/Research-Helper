// Set up an event listener for runtime messages
// const baseUrl = "http://localhost:3000/api/";
const baseUrl = "https://youtube-research-extension.herokuapp.com/api/";

const url = baseUrl + "entries/";
const urlLogin = baseUrl + "users/login";
listenForMessage((message, sender) => {

    if (message.login) {
        // alert(JSON.stringify(message));
        login(message.user)
    }
    else {
        // alert(
        //     'message from content.js:' + '\n' +
        //     'url    ' + message.url + '\n' +
        //     'title  ' + message.title + '\n' +
        //     'time   ' + message.time + '\n' +
        //     'note   ' + message.note
        // );
        chrome.storage.sync.get(['key'], function (result) {
            sendEntry(message, result.key)
        });
    }

    function login(user) {
        var data = JSON.stringify(user);
        var xhr = new XMLHttpRequest();
        xhr.withCredentials = false;

        xhr.addEventListener("readystatechange", function () {
            console.log(this.responseText);
            if (this.readyState === this.DONE) {
                let value =JSON.parse(this.responseText).token;
                chrome.storage.sync.set({key: value}, function () {
                    // alert('Value is set to ' + value);
                });
            } else if ((this.readyState === 400 || this.responseText.includes('ValidationError'))) {
                alert('Login Error ');
            }
        });

        xhr.open("POST", urlLogin);
        xhr.setRequestHeader("content-type", "application/json");
        xhr.setRequestHeader("Access-Control-Allow-Origin", "*");

        xhr.send(data);

        chrome.browserAction.setBadgeText({text: JSON.stringify(message)});
        return message;
    }

    function sendEntry(message, token) {

        let data = JSON.stringify(message);
        let xhr = new XMLHttpRequest();
        xhr.withCredentials = false;
        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === this.DONE) {
                // alert(this.responseText);
            }
        });
        xhr.open("POST", url);
        xhr.setRequestHeader("authorization", token);
        xhr.setRequestHeader("content-type", "application/json");

        xhr.send(data);
        chrome.browserAction.setBadgeText({text: JSON.stringify(message)});
        return message;
    }
});
