const mongoose = require('mongoose');
const schema = mongoose.Schema({
    'name' : String,
    'email' :String,
    'password' : String
})
const data = mongoose.model('practices',schema);

module.exports = data;