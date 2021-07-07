const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
    flight:{type:mongoose.Schema.Types.ObjectId , ref:'Flight'},
    seats:[{type:mongoose.Schema.Types.ObjectId , ref:'Seat'}],
    user:{type:mongoose.Schema.Types.ObjectId , ref:'User'}
})

ticketSchema.pre('remove' , (ticket) =>{
    console.log('In ticket');
    console.log(ticket);
    ticket.seat.isBooked = false;
})

const Ticket = mongoose.model('Ticket' , ticketSchema);

module.exports = Ticket;