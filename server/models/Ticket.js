const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
    flight:{type:mongoose.Schema.Types.ObjectId , ref:'Flight'},
    seat:{type:mongoose.Schema.Types.ObjectId , ref:'Seat'},
    user:{type:mongoose.Schema.Types.ObjectId , ref:'User'},
    passengerName:{type:mongoose.Schema.Types.String , required:true}
})

ticketSchema.pre('remove' , (ticket) =>{
    console.log(ticket);
    ticket.seat.isBooked = false;
})

ticketSchema.virtual('id').get(function(){
    return this._id.toHexString();
});

// Ensure virtual fields are serialised.
ticketSchema.set('toJSON', {
    virtuals: true
});

const Ticket = mongoose.model('Ticket' , ticketSchema);

module.exports = Ticket;