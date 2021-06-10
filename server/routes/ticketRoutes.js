const express = require('express');
const router = new express.Router();
const Ticket = require('../models/Ticket');
const Flight = require('../models/Flight');
const User = require('../models/User');
const { BadRequest, Ok } = require('./responses');


router.post('/create', async (req, res) => {

    const flight = await Flight.findById(req.body.flightId)
        .populate('sections')
        .populate({
            path: 'sections',
            populate: 'seats'
        });

    if (!flight) {
        return BadRequest(res, 'Flight doesn\'t exist');
    }

    const section = await flight.sections.find(s => s.seatClass === req.body.seatClass);

    if (!section) {
        return BadRequest(res, 'Section does\'t exist');
    }

    const seat = await section.seats.find(s => s.row === req.body.row && s.column === req.body.column);

    if (!seat) {
        return BadRequest(res, 'Seat doesn\'t exist');
    }

    if (seat.isBooked) {
        return BadRequest(res, 'Seat is already booked');
    }


    const user = await User.findById(req.body.userId);
    if(!user){
        return BadRequest(res , 'Not logged');
    }

    const ticket = await Ticket.create({
        flight,
        section,
        seat
    });


    user.tickets.push(ticket);
    user.save();



    seat.isBooked = true;
    seat.save();

    return Ok(res, `Seat ${seat.seatNumber} booked successfully`, ticket);

})

router.delete('/remove', async (req, res) => {
    const ticket = await Ticket.findById(req.body.ticketId).populate('seat');

    if (!ticket) {
        return BadRequest(res, 'Ticket not found');
    }

    const seat = ticket.seat;
    seat.isBooked = false;
    seat.save();
    Ticket.remove(ticket).then(() => {
        return Ok(res, `Seat ${seat.seatNumber} unbooked` );
    });

})

router.get('/user/:Id' , async (req ,res) =>{

    const user = await User.findById(req.user._id)
    .populate({
        path:'tickets', 
        populate:[{
            path:'flight'
        },
        {
            path:'section'
        },
        {
            path:'seat'
        }
    ]
    });

    if(!user){
        return BadRequest(res , 'User not found');
    }

    const parsedTickets = user.tickets?.map(t => {
        return {
            ticketId:t._id,
            flightNumber:t.flight.flightNumber,
            seatClass: t.section.seatClass,
            seatNumber:t.seat.seatNumber,
            seatId:t.seat._id
        }
    })

    return Ok(res, null , parsedTickets);

})

module.exports = router;