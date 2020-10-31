const express = require('express')
const path = require('path')
const app = express()
var http = require('http').Server(app);
var io = require('socket.io')(http);
const users = [];
const chatLog = [];
const port = process.env.PORT || 3000

io.on('connection', function(socket) {
    console.log('A user connected');
    socket.on('login', function(data) {
        if(data !== '' && users.indexOf(data) === -1 ){
            console.log(data)
            users.push(data)
            io.emit('userlist', {users})
            io.emit('messageList', chatLog)
        }
    })
    socket.on('message', function(chatMessage){
        if(Array.isArray(chatMessage) && chatMessage[1] !== ''){
            
            chatLog.push(chatMessage[0] + ": " + chatMessage[1])
            io.emit('messageList', chatLog )
            console.log(chatLog)
        }
    })
});



app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname + '/index.html'))
});

app.get("/css/style.css", (req, res) => {
    res.sendFile(path.join(__dirname + '/css/style.css'))
});

app.get("/js/script.js", (req, res) => {
    res.sendFile(path.join(__dirname + '/js/script.js'))
});

http.listen(port, function(){
    console.log('listening on localhost: ' + port);
});
