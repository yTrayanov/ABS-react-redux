const mongoose = require('mongoose');

const airlineSchema = new mongoose.Schema({
    name:{
        type:mongoose.Schema.Types.String,
        required:true,
        unique:true,
        max:6,
    },
    flights:[{type:mongoose.Schema.Types.ObjectId , ref:'Flight'}]
});

airlineSchema.path('name').validate((value) =>{
    return value.match("^[A-Z]+$");
})

const Airline = mongoose.model('Airline' , airlineSchema);

module.exports = Airline;