function sendMessage(message) {
    return new Promise((resolve, reject) => {
        try {
            chrome.runtime.sendMessage(message, resolve);
        } catch (err) {
            reject(err);
        }
    });
}
let value = user.email;
chrome.storage.sync.set({key: value}, function () {
    alert('Value is set to ' + value);
});

window.addEventListener('state-changed', function(e) {
    if(document.title.includes('watch')){
        alert('ok')
    }else {
        alert('opps')
    }
});
chrome.storage.sync.get(['key'], function (result) {
    // alert('Value currently is ' + result.key);
// Create a simple button to send message
    const button = document.createElement('button');
    button.innerText = 'Set Badge Text';
    button.style.display = 'block';
    button.style.position = 'fixed';
    button.style.top = '50px';
    button.style.zIndex = '9999';
    button.style.right = '15px';
    button.style.border = '3px solid #f1f1f1';
    let message = {};
    let video = document.getElementsByClassName('video-stream')[0] || {};
    button.onclick = event => {
        sendMessage(message).then(message => {
            // alert(
            //     'message from background.js::' + '\n' +
            //     'url    ' + message.url + '\n' +
            //     'title  ' + message.title + '\n' +
            //     'time   ' + message.time + '\n' +
            //     'note   ' + message.note
            // );
        });
    };

    document.body.append(button);
    if (result.key) {
        message = {
            url: window.location.href,
            time: video.currentTime,
            title: document.title,
            note: 'nooootttteeeee'
        };
    } else {
        message = {
            login: 'yes',
            user: {
                email: 'email.thing.com',
                password: 'password'
            }
        };
    }
});

