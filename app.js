const express = require('express');
const bodyParser = require('body-parser')
const faker = require('faker');

const menssage = require('./menssage')
const account = require('./account')
require('./dbconfig')

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

const CACHE_TOKEN = [];
const CACHE_MSG = [];

app.post('/account', (req, res, next) => {

    const { name, pass } = req.body;

    new account({
        name,
        pass,
        token: faker.random.uuid(),
    }).save((err, resp) => {

        if (!err) {
            res
                .status(200)
                .json(resp)
            CACHE_TOKEN.push(resp.token)
        }
    })

})

io.on('connection', socket => {

    socket.emit('previusMenssage', CACHE_MSG)


    socket.on('Hello', data => {
        if (data !== {})
            socket.broadcast.emit('newConnection', { newConnection: data })
    })

    socket.on('sendMenssage', data => {

        if (!CACHE_TOKEN.find(item => item.token = data.token))
            return

        delete data.token

        CACHE_MSG.push(data)
        new menssage(data).save((err, resp) => {
            if (!err)
                socket.broadcast.emit('recivedMenssage', resp)
        })


    })

});

const portChat = 8000;
const portAPI = 8001
io.listen(portChat);
app.listen(portAPI)
