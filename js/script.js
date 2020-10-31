  var socket = io()
  var loginStatus = false
  
  function login(){
    console.log('hello')
    socket.emit('login', document.getElementById('userName').value)
    loginStatus = true
  }
  socket.on('userlist', function(data){
    if (loginStatus){
      updateUI(data)
    }
  })

  socket.on('messageList', function(chatMessages){
    console.log(chatMessages)
    
  })
  function send(){
      socket.emit('message', document.getElementById('message').value)
      document.getElementById('message').value = ''
  }

  function updateUI(data){
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
