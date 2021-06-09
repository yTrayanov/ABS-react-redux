const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
    flight:{type:mongoose.Schema.Types.ObjectId , ref:'Flight'},
    section:{type:mongoose.Schema.Types.ObjectId , ref:'Section'},
    seat:{type:mongoose.Schema.Types.ObjectId , ref:'Seat'}
})

ticketSchema.pre('remove' , (ticket) =>{
    console.log('In ticket');
    console.log(ticket);
    ticket.seat.isBooked = false;
})

const Ticket = mongoose.model('Ticket' , ticketSchema);

module.exports = Ticket;