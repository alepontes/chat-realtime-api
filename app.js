const express = require('express');
const bodyParser = require('body-parser')
const app = express();

const db = require('./mock').db
const account = require('./mock').account

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");
    res.header('Access-Control-Allow-Headers', '*');
    next();
})


app.post('/account', (req, res, next) => {

    const { name, pass } = req.body;

    account.login(name, pass, (err, token) => {
        if (!err)
            res.json({ token })
        else
            res.json({ err })
    });

})


app.get('/', async (req, res, next) => {
    res.json(await db.get())
})


app.post('/', (req, res, next) => {

    const { name, text } = req.body;

    item = {
        name,
        text,
    }

    db.add(item)

    res.json(item)

})


app.delete('/', (req, res, next) => {
    res.json("DELETE")
})


app.listen(4001, () => console.log("Rodando"))


// function juros(p, n, porc) {
//     n = n || 30
//     porc = porc ? porc / 100 : 0.01;
//     const f = p * Math.pow((1 + porc), n)
//     console.log("Total: " + parseInt(f))
//     console.log("Lucro: " + parseInt(f - p))
// }