const express = require('express')
const path = require('path')
const app = express()
var http = require('http').Server(app);
var io = require('socket.io')(http);
const users = {}  // userName: {room, socket} // name, room, socket };
const chatLog = {}; //roomName {messageArr}
const rooms = {}; // roomName {userList}
const port = process.env.PORT || 3000

io.on('connection', function(socket) {
    console.log('A user connected');
    socket.on('login', function(data) {
        if(data[0] !== '' && data[1] !== '' ){
            if(rooms[data[1]] === undefined || (Array.isArray(rooms[data[1]]) && rooms[data[1]].indexOf(data[0]) === -1 )){
                users[data[0]] = {room: data[1], socket}
                //rooms[data[1]] = {}//check if roomdata[1] exists
                socket.join(data[1])
                rooms[data[1]] = rooms[data[1]] ? [...rooms[data[1]], data[0]]: [data[0]]
                io.in(data[1]).emit('userlist', rooms[data[1]])
                io.in(data[1]).emit('messageList', chatLog[data[1]])
            }

        }
    })
    socket.on('message', function(chatMessage){
        if(Array.isArray(chatMessage) && chatMessage[2] !== ''){
            if (chatLog[chatMessage[1]]){
                chatLog[chatMessage[1]].push(chatMessage[0] + ": " + chatMessage[2])
            } else {
                chatLog[chatMessage[1]] = [chatMessage[0] + ": " + chatMessage[2]]
            }
            console.log(chatLog, 'Chat log ====')
            io.in(chatMessage[1]).emit('messageList', chatLog[chatMessage[1]] )
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
