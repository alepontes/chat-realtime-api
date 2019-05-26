const mongoose = require('mongoose');

const port = `27017`
const uri = `mongodb://localhost:${port}`;
// mongodb://<dbuser>:<dbpassword>@ds129823.mlab.com:29823/orb

mongoose.connect(uri, (err, res) => {
    if (!err)
        console.log('Conectado a ' + uri);
    else
        console.log('Erro ao conectar com ' + uri);
});
