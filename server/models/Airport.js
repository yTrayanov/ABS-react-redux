const mongoose = require('mongoose');

const airportSchema = new mongoose.Schema({
    name:{
        type:mongoose.Schema.Types.String,
        required:true,
        unique:true,
        length:3
    }
})


airportSchema.path('name').validate((value) =>{
    return value.match("^[A-Z]+$");
})

const Airport = mongoose.model('Airport' , airportSchema);

module.exports = Airport;