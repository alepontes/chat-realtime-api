const mongoose = require('mongoose');

const port = `27017`
const uri = `mongodb://localhost:${port}`;
// mongodb://<dbuser>:<dbpassword>@ds129823.mlab.com:29823/orb

const options = {
    useNewUrlParser: true,
    autoIndex: false, // Don't build indexes
    reconnectTries: Number.MAX_VALUE, // Never stop trying to reconnect
    reconnectInterval: 500, // Reconnect every 500ms
    poolSize: 10, // Maintain up to 10 socket connections
    // If not connected, return errors immediately rather than waiting for reconnect
    bufferMaxEntries: 0
};
mongoose.connect(uri, options, (err, res) => {
    if (!err)
        console.log('Conectado a ' + uri);
    else
        console.log('Erro ao conectar com ' + uri);
});
