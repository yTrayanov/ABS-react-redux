const mongoose = require('mongoose');

const seatSchema = new mongoose.Schema({
    row:{type:mongoose.Schema.Types.Number , required:true},
    column:{type:mongoose.Schema.Types.Number , required:true},
    isBooked:{type:mongoose.Schema.Types.Boolean , default:false },
    seatNumber:{type:mongoose.Schema.Types.String },
    section:{type:mongoose.Schema.Types.ObjectId , ref:'Section'},
    ticket:{type:mongoose.Schema.Types.ObjectId , ref:'Ticket'}
})


const Seat = mongoose.model('Seat' , seatSchema);

module.exports = Seat;