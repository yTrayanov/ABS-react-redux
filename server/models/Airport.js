const mongoose = require('mongoose');

const airportSchema = new mongoose.Schema({
    name:{
        type:mongoose.Schema.Types.String,
        required:true,
        unique:true,
        length:3
    }
})

airportSchema.virtual('id').get(function(){
    return this._id.toHexString();
});

// Ensure virtual fields are serialised.
airportSchema.set('toJSON', {
    virtuals: true
});

airportSchema.path('name').validate((value) =>{
    return value.match("^[A-Z]+$");
})

const Airport = mongoose.model('Airport' , airportSchema);

module.exports = Airport;