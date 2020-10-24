const express = require('express')
const path = require('path')
const app = express()
var http = require('http').Server(app);
var io = require('socket.io')(http);
const users = [];
const port = process.env.PORT || 3000

io.on('connection', function(socket) {
    console.log('A user connected');
    socket.on('login', function(data) {
        if(data !== '' && users.indexOf(data) === -1 ){
            console.log(data)
            users.push(data)
            io.emit('userlist', {users})
        }
    })
});

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname + '/index.html'))
});

app.get("/css/style.css", (req, res) => {
    res.sendFile(path.join(__dirname + '/css/style.css'))
});

http.listen(3000, function(){
    console.log('listening on localhost:3000');
});
