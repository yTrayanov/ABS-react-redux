const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    createdAt:{type:mongoose.Schema.Types.Date , default:Date.now , expires:60},
    user:{type:mongoose.Schema.Types.ObjectId , ref:'User'}
});

const PasswordChangeRequest = mongoose.model('PasswordChangeRequest' , schema);

module.exports = PasswordChangeRequest;