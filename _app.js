const express = require('express');
const bodyParser = require('body-parser')
const path = require('path');

const app = express();
const server = require('http').createServer(express());
const io = require('socket.io')(server);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");
    res.header('Access-Control-Allow-Headers', '*');
    next();
})

const mensagens = require('./mock').db
const account = require('./mock').account

app.post('/account', (req, res, next) => {

    console.log("REQ")
    console.log(req.body)

    const { name, pass } = req.body;

    account.login(name, pass, (err, token) => {
        if (!err)
            res.json({ token })
        else
            res.json({ err })
    });

})

// middleware
io.use((data, next) => {
    next();
});


io.on('connection', socket => {
    // here you can start emitting events to the client 
    console.log("Nova conexão")

    socket.on('Hello', data => {
        socket.broadcast.emit('newConnection', { newConnection: data })

    })

    socket.emit('previusMenssage', mensagens.get())


    socket.on('sendMenssage', data => {


        if (data.token == "tokenAA")
            console.log("Token:" + data.token)

        delete data.token


        mensagens.add(data)
        socket.broadcast.emit('recivedMenssage', data)
    })


});

const portChat = 8000;
const portAPI = 8001
io.listen(portChat);
app.listen(portAPI)
console.log('Rodando');
