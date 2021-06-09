const mongoose = require('mongoose');

const flightSchema = new mongoose.Schema({
    flightNumber:{type:mongoose.Schema.Types.String ,required:true , unique:true},
    departureDate:{type:mongoose.Schema.Types.Date , required:true},
    airline:{type:mongoose.Schema.Types.ObjectId , ref:'Airline'},
    originAirport:{type:mongoose.Schema.Types.ObjectId , ref:'Airport'},
    destinationAirport:{type:mongoose.Schema.Types.ObjectId , ref:'Airport'},
    sections:[{type:mongoose.Schema.Types.ObjectId , ref:'Section'}]
})

const Flight = mongoose.model('Flight' , flightSchema);
module.exports = Flight;