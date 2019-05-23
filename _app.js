const express = require('express');
const path = require('path');

const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

const mensagens = require('./mock').db

io.on('connection', socket => {
    // here you can start emitting events to the client 
    console.log("Nova conexão")


    socket.emit('previusMenssage', mensagens.get())


    socket.on("sendMenssage", data => {
        mensagens.add(data)
        socket.broadcast.emit('recivedMenssage', data)
    })


});

const port = 8000;
io.listen(port);
console.log('listening on port ', port);
