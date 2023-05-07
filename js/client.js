const socket=io('http://localhost:8000');

const form=document.getElementById('sendcontainer');
const messageinput=document.getElementById('messageinp');
// const messagecontainer=document.querySelector('.boxc');
const messagecontainer=document.getElementById('box');
var audio= new Audio('ting.mp3');

const append=(message,position)=>{
    const messageelement=document.createElement('div');
    messageelement.innerText=message;
    messageelement.classList.add('message');
    messageelement.classList.add(position);
    messagecontainer.append(messageelement);
    if(position=='left')
    audio.play();
}

form.addEventListener('submit',(e)=>{
e.preventDefault();
const message=messageinput.value;
append(`You:${message}`,'right');
socket.emit('send',message);
messageinput.value='';
})
const name=prompt("Enter your name to join");

socket.emit('newuserjoined',name);

socket.on('userjoined',name=>{
    console.log("Join");
append(`${name} joined the chat`,'right');
})

socket.on('receive',data=>{
    append(`${data.name}: ${data.message}`,'left');
})

socket.on('left',name=>{
    append(`${name} left the chat`,'left');
})
