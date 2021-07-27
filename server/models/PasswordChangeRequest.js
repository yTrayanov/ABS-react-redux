const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    createdAt:{type:mongoose.Schema.Types.Date , default:Date.now , expires:300},
    user:{type:mongoose.Schema.Types.ObjectId , ref:'User'}
});

schema.virtual('id').get(function(){
    return this._id.toHexString();
});

// Ensure virtual fields are serialised.
schema.set('toJSON', {
    virtuals: true
});

const PasswordChangeRequest = mongoose.model('PasswordChangeRequest' , schema);

module.exports = PasswordChangeRequest;