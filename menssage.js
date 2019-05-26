const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MenssageSchema = new Schema({

    name: String,
    text: String,
    date: String,
    token: String,

});

module.exports = mongoose.model('Menssage', MenssageSchema);
