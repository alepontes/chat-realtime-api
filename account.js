const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AccountSchema = new Schema({

    name: { type: String },
    pass: { type: String },
    token: { type: String },

});

module.exports = mongoose.model('Account', AccountSchema);
