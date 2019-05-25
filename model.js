const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProdutoSchema = new Schema({

    name: String,
    text: String,
    date: String,
    token: String,

});

module.exports = mongoose.model('Produto', ProdutoSchema);
