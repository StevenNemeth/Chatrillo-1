  var socket = io()
  var loginStatus = false
  var userName

  function login(){
    console.log('hello')
    socket.emit('login', document.getElementById('userName').value)
    loginStatus = true
    userName = document.getElementById('userName').value
  }
  socket.on('userlist', function(data){
    if (loginStatus){
      updateUI(data)
    }
  })

  socket.on('messageList', function(chatMessages){
    console.log(chatMessages)
    const messageLog = document.getElementById('messageLog')
    messageLog.innerHTML = ''
    chatMessages.forEach(function(message){
      var newMessage = document.createElement('p')
      newMessage.textContent = message
      messageLog.appendChild(newMessage)
    })
      

    
  })
  function send(){
    var data = [userName, document.getElementById('message').value]
      socket.emit('message', data)
      document.getElementById('message').value = ''
  }

  function updateUI(data){

    // Get the input field
var input = document.getElementById("message");

// Execute a function when the user releases a key on the keyboard
input.addEventListener("keydown", function(event) {
  // Number 13 is the "Enter" key on the keyboard
  if (event.keyCode === 13) {
    console.log(event)
    // Cancel the default action, if needed
    event.preventDefault();
    // Trigger the button element with a click
    document.getElementById("send").click();
  }
});

    var element = document.getElementById('roomForm');
    var chatElement = document.getElementById('chat');
    if(element){
      element.parentNode.removeChild(element);
      chatElement.style.display = 'block';
    } 

    var newDiv = document.createElement('div')
    newDiv.id = 'userList'
    var temp = document.getElementById('userList')
    if(temp){
      temp.innerHTML = ''

    }
    for (var i = 0; i < data.users.length; i++){
      var user = document.createElement('p') 
      user.textContent = data.users[i]
      // ["Steve", "Eric"]
      newDiv.appendChild(user)

    }
    var newMessageLog = document.createElement('div')
    newMessageLog.id = 'messageLog'
    var messageHistory = document.getElementById('messageLog')
    if(messageHistory){
      messageHistory.innerHTML = ''

    }
    document.getElementsByTagName('body')[0].appendChild(newDiv)
    document.getElementsByTagName('body')[0].appendChild(newMessageLog)
  console.log(data)
  } 
