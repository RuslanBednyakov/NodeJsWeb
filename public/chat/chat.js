const socket = io.connect('', {
  reconnect: false
});

// socket.on('disconnect', function(){
//   setTimeout(reconnect, 500)
// })

// function reconnect() {
//   socket.once('error', function(){
//     setTimeout(reconnect,500)
//   });
//   socket.socket.connect();
// }

const buttonSend = document.getElementById('sendMessageButton');
const inputMessage = document.getElementById('inputMessage');
const ul = document.getElementById('chatList');

buttonSend.addEventListener('click', sendMessage)

const test = createElem('button', 'chat__test', `Test`)

test.addEventListener('click', Testing)

ul.appendChild(test);

function Testing() {
  socket.emit('Test');
}

socket.on('testBack', function(message) {
  console.log(message)
  // location.href = 'http://localhost:4000/sign-in';
})



function sendMessage() {
  const message = inputMessage.value;
  inputMessage.value = '';

  socket.emit('message', message, function(username){
    const li = createElem('li', 'chat__container_list-item', `${username} -> ${message}`);
    ul.appendChild(li); 
  });
  return false;
}

socket.on('message', function(username, message) {
  const li = createElem('li', 'chat__container_list-item', `${username} -> ${message}`);
  ul.appendChild(li);
})

socket.on('leave', function(userName) {
  const li = createElem('li', 'chat__container_list-item', `${userName} left the channel`);
  ul.appendChild(li);
})

socket.on('join', function(userName) {
  const li = createElem('li', 'chat__container_list-item', `${userName} joined the channel`);
  ul.appendChild(li);
})

socket.on('logout', function() {
  location.href = 'http://localhost:4000/sign-in';
})

function createElem(newElem, elemClass, elemText) {

  const elem = document.createElement(newElem);
  elem.classList.add(elemClass);

  if (elemText) {

      const text = document.createTextNode(elemText);
      elem.appendChild(text);
  };

  return elem;
};