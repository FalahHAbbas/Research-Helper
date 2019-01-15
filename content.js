function sendMessage(message) {
    return new Promise((resolve, reject) => {
        try {
            chrome.runtime.sendMessage(message, resolve);
        } catch (err) {
            reject(err);
        }
    });
}

window.addEventListener('state-changed', function (e) {
    if (document.title.includes('watch')) {
        alert('ok')
    } else {
        alert('opps')
    }
});
// let value = '';
// chrome.storage.sync.set({key: value}, function () {
//     alert('Value is set to ' + value);
// });


// Create a simple button to send message
const button = document.createElement('button');
button.innerText = 'Research';
button.style.background = '#532578';
button.style.color = '#ffa6d6';
button.style.position = 'fixed';
button.style.width = '75px';
button.style.height = '30px';
button.style.top = '50px';
button.style.zIndex = '9999';
button.style.right = '15px';
button.style.border = '3px solid #f1f1f1';
button.style.borderRadius = '10px';
button.style.padding = '5px';

var video = document.getElementsByClassName('video-stream')[0] || {};
button.onclick = event => {

};


let loginForm = document.createElement('div');
loginForm.style.display = 'none';
loginForm.style.alignItems = 'center';
loginForm.style.flexDirection = 'column';
loginForm.style.background = '#775599';
loginForm.style.position = 'fixed';
loginForm.style.width = '250px';
loginForm.style.height = '150px';
loginForm.style.top = '80px';
loginForm.style.zIndex = '9999';
loginForm.style.right = '15px';
loginForm.style.border = '3px solid #f1f1f1';
loginForm.style.borderRadius = '40px';
loginForm.style.padding = '10px';

let txtEmail = document.createElement('input');

txtEmail.style.background = '#ecf0f1';
txtEmail.style.border = '#ccc 1px solid';
txtEmail.style.borderBottom = '#ccc 2px solid';
txtEmail.style.padding = '8px';
txtEmail.style.width = '220px';
txtEmail.style.color = '#AAAAAA';
txtEmail.style.marginTop = '10px';
txtEmail.style.fontSize = '1em';
txtEmail.style.borderRadius = '4px';

let txtPassword = document.createElement('input');

txtPassword.type = 'password';
txtPassword.style.background = '#ecf0f1';
txtPassword.style.border = '#ccc 1px solid';
txtPassword.style.borderBottom = '#ccc 2px solid';
txtPassword.style.padding = '8px';
txtPassword.style.width = '220px';
txtPassword.style.color = '#AAAAAA';
txtPassword.style.marginTop = '10px';
txtPassword.style.fontSize = '1em';
txtPassword.style.borderRadius = '4px';


let btnLogin = document.createElement('button');

btnLogin.style.background = '#2ecc71';
btnLogin.style.width = '125px';
btnLogin.style.paddingTop = '5px';
btnLogin.style.paddingBottom = '5px';
btnLogin.style.color = 'white';
btnLogin.style.borderRadius = '4px';
btnLogin.style.border = '#27ae60 1px solid';
btnLogin.style.marginTop = '20px';
btnLogin.style.marginBottom = '20px';
btnLogin.style.float = 'left';
btnLogin.style.marginLeft = '16px';
btnLogin.style.fontWeight = '800';
btnLogin.style.fontSize = '1.2em';
btnLogin.innerText = 'Login';

loginForm.appendChild(txtEmail);
loginForm.appendChild(txtPassword);
loginForm.appendChild(btnLogin);


let entryForm = document.createElement('div');

entryForm.style.display = 'none';
entryForm.style.alignItems = 'center';
entryForm.style.flexDirection = 'column';
entryForm.style.background = '#775599';
entryForm.style.position = 'fixed';
entryForm.style.width = '250px';
entryForm.style.height = '250px';
entryForm.style.top = '80px';
entryForm.style.zIndex = '9999';
entryForm.style.right = '15px';
entryForm.style.border = '3px solid #f1f1f1';
entryForm.style.borderRadius = '40px';
entryForm.style.padding = '10px';


entryForm.innerHTML = '<label>note: \n' +
    '    </label><br>';
let title = document.createElement('h3');
let time = document.createElement('h5');
let txtNote = document.createElement('input');


txtNote.style.background = '#ecf0f1';
txtNote.style.border = '#ccc 1px solid';
txtNote.style.borderBottom = '#ccc 2px solid';
txtNote.style.padding = '8px';
txtNote.style.width = '220px';
txtNote.style.color = '#1f042b';
txtNote.style.marginTop = '10px';
txtNote.style.fontSize = '1.5em';
txtNote.style.borderRadius = '10px';

let btnSend = document.createElement('button');
btnSend.innerText = 'Send';

btnSend.style.background = '#2ecc71';
btnSend.style.width = '125px';
btnSend.style.paddingTop = '5px';
btnSend.style.paddingBottom = '5px';
btnSend.style.color = 'white';
btnSend.style.borderRadius = '4px';
btnSend.style.border = '#27ae60 1px solid';
btnSend.style.marginTop = '20px';
btnSend.style.marginBottom = '20px';
btnSend.style.float = 'left';
btnSend.style.marginLeft = '16px';
btnSend.style.fontWeight = '800';
btnSend.style.fontSize = '1.2em';
btnSend.onclick = ev => {
    let email = txtEmail.value;
    let password = txtPassword.value;
    const message = {
        login: 'yes',
        user: {
            email: email,
            password: password
        }
    };
    sendMessage(message).then(message => {
        txtEmail.value = '';
        txtPassword.value = '';
        location.reload();

        // alert(
        //     'message from background.js::' + '\n' +
        //     'url    ' + message.url + '\n' +
        //     'title  ' + message.title + '\n' +
        //     'time   ' + message.time + '\n' +
        //     'note   ' + message.note
        // );
    });
    // alert(note);
};

entryForm.appendChild(title);
entryForm.appendChild(time);
entryForm.appendChild(txtNote);
entryForm.appendChild(btnSend);
btnSend.onclick = ev => {
    let note = txtNote.value;
    const message = {
        url: window.location.href,
        time: video.currentTime,
        title: document.title,
        note: note
    };
    // const message = {
    //     login: 'yes',
    //     user:{
    //         email:'email.thing.com',
    //         password:'password'
    //     }
    // };
    sendMessage(message).then(message => {
        txtNote.value = '';
        // alert(
        //     'message from background.js::' + '\n' +
        //     'url    ' + message.url + '\n' +
        //     'title  ' + message.title + '\n' +
        //     'time   ' + message.time + '\n' +
        //     'note   ' + message.note
        // );
    });
    // alert(note);
};
let form = document.createElement('div');
form.style.position = 'fixed';
form.style.width = '250px';
form.style.height = '300px';
form.style.top = '50px';
form.style.zIndex = '99999';

chrome.storage.sync.get(['key'], function (result) {
    if (result.key) {
        form.appendChild(entryForm);
    } else {
        form.appendChild(loginForm);
    }
});
form.appendChild(button);

form.addEventListener("mouseleave", function (event) {
    form.children[1].style.display = 'none';
}, false);

button.addEventListener("mouseenter", function (event) {
    form.children[1].style.display = 'flex';
    title.innerText = document.title;
    time.innerText = video.currentTime;

}, false);

document.body.append(form);

