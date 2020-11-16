var socket = io()
var loginStatus = false
var userName
var roomName

function login() {
  userName = document.getElementById('userName').value
  roomName = document.getElementById('roomNameInput').value
  var loginData = [userName, roomName]
  socket.emit('login', loginData)
  loginStatus = true
}
socket.on('errorMsg', function(errorMsg){ //socket event 'error' is a reserved event
  document.getElementById('error').textContent = errorMsg
  document.getElementById('error').style.display = 'block'
  // error div is set to default display: none
})
socket.on('userlist', function (data) {
  if (loginStatus) {
    updateUI(data)
  }
})

socket.on('messageList', function (chatMessages) {
  const messageLog = document.getElementById('messageLog')
  messageLog.innerHTML = ''
  chatMessages.forEach(function (message) {
    var newMessage = document.createElement('p')
    newMessage.textContent = message
    messageLog.appendChild(newMessage)
  })



})
function send() {
  var data = [userName, roomName, document.getElementById('message').value]
  socket.emit('message', data)
  document.getElementById('message').value = ''
}

function updateUI(data) { // gets rid of error message after succeful login
  document.getElementById('error').style.display = 'none'


  // Get the input field
  var input = document.getElementById("message");

  // Execute a function when the user releases a key on the keyboard
  input.addEventListener("keydown", function (event) {
    // Number 13 is the "Enter" key on the keyboard
    if (event.keyCode === 13) {
      console.log(event)
      // Cancel the default action, if needed
      event.preventDefault();
      // Trigger the button element with a click
      document.getElementById("send").click();
    }
  });
  document.getElementById('roomName').textContent = 'Room Name: ' + roomName

  var roomElement = document.getElementById('roomName');
  var chatElement = document.getElementById('chat');
  var element = document.getElementById('roomForm');
  var copy = document.getElementById('copy')

  if (element) { // removes login form once connected to a room
    element.parentNode.removeChild(element);
    chatElement.style.display = 'block';
  }
  if (roomElement) {
    roomElement.style.display = 'inline';
  }
  if(copy) {
    copy.style.display = 'inline';
  }


  var newDiv = document.createElement('div')
  newDiv.id = 'userList'
  var temp = document.getElementById('userList')
  if (temp) { // resets userlist so that it appends respectivly 
    temp.innerHTML = ''

  }
  for (var i = 0; i < data.length; i++) {
    var user = document.createElement('p')
    user.textContent = data[i]
    if(userName === data[i]){
      //this colors the current user (you) white
      user.style.color = 'white'
    }
    // adds user to the end of a newly created div
    newDiv.appendChild(user)

  }
  var newMessageLog = document.createElement('div')
  newMessageLog.id = 'messageLog'
  var messageHistory = document.getElementById('messageLog')
  if (messageHistory) {
    messageHistory.innerHTML = ''

  }
  document.getElementsByTagName('body')[0].appendChild(newDiv)
  document.getElementsByTagName('body')[0].appendChild(newMessageLog)
  console.log(data)
} 
