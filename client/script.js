const socket = io();

const roomBtn = document.getElementById("room-btn"); 
const sendBtn = document.getElementById("send-btn");
const roomInput = document.getElementById("room-input");
const msgInput  = document.getElementById("message-input");
const form =  document.getElementById("form");


function time(){
    let new_time = new Date();
    const offset = new_time.getTimezoneOffset() *  60000;
    const local = new Date(new_time.getTime() - offset);
    return (local).toISOString().slice(0, 19).replace("T", " ");
}

// msg handling

socket.on('message', message =>{
    displayMessage(message);
})


// msgs appenden

function displayMessage(message){
    const div = document.createElement("div");
    div.textContent = message;
    document.getElementById("nachrichten-container").append(div);
}

// nachrichten

form.addEventListener('submit', e=>{
    e.preventDefault();
    const message = msgInput.value;

    if(message === "") return;
    socket.emit('chat_msg', message);
    msgInput.value = "";
})

