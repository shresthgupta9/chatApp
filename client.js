const socket = io('http://localhost:3000');

const form = document.getElementById('send-container');
const msgInput = document.getElementById('msgInp');
const msgContainer = document.querySelector(".container");

form.addEventListener("submit", (e) => {
    e.preventDefault();
    const msg = msgInput.value;
    append(`You: ${msg}`, 'right');
    socket.emit('send', msg);
    msgInput.value = "";
})

const append = (msg, position) => {
    const msgElement = document.createElement('div');
    msgElement.innerText = msg;
    msgElement.classList.add('txt');
    msgElement.classList.add(position);
    msgContainer.append(msgElement);
    if (position == 'left') {
        music.play();
    }
}

let music = new Audio('./media/notification.mp3');

const nameg = prompt("Enter your name to connect");

socket.emit('new-user-joined', nameg);

socket.on('user-joined', (name) => {
    append(`${name} joined the chat`, 'left');
});

socket.on('receive', (data) => {
    append(`${data.name}: ${data.msg}`, 'left');
});

socket.on('leave', (name) => {
    append(`${name} left the chat`, 'left');
});
