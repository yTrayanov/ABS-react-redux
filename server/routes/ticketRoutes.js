const express = require('express');
const router = new express.Router();
const Ticket = require('../models/Ticket');
const Flight = require('../models/Flight');
const User = require('../models/User');
const Seat = require('../models/Seat');
const Section = require('../models/Section');
const { BadRequest, Ok, Unauthorized } = require('./responses');


router.post('/create', async (req, res) => {

    if (!req.user) {
        return BadRequest(res, 'Not logged');
    }

    const flight = await Flight.findById(req.body.flightId)
        .populate('sections')
        .populate({
            path: 'sections',
            populate: 'seats'
        });

    if (!flight) {
        return BadRequest(res, 'Flight doesn\'t exist');
    }

    for (let item of req.body.seats) {

        const seat = await Seat.findById(item._id);

        if (!seat) {
            return BadRequest(res, 'Seat doesn\'t exist');
        }

        if (seat.isBooked) {
            return BadRequest(res, 'Seat is already booked');
        }

        seat.isBooked = true;
        seat.save();
    }

    const ticket = await Ticket.create({
        flight,
        seats: req.body.seats,
        user: req.user._id,
    });

    req.user.tickets.push(ticket);
    req.user.save();

    setTimeout(() => {
        return Ok(res, `Seats booked successfully`, ticket);
    }, 1000);

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
        return Ok(res, `Seat ${seat.seatNumber} unbooked`);
    });

})

router.get('/user', async (req, res) => {

    if (!req.user) {
        return Unauthorized(res, 'User is not logged');
    }

    const user = await User.findById(req.user._id)
        .populate({
            path: 'tickets',
            populate: [{
                path: 'flight'
            },
            {
                path: 'seats',
                populate: [{
                    path: 'section',
                    model: Section
                }],
            }
            ]
        });

    if (!user) {
        return BadRequest(res, 'User not found');
    }

    const parsedTickets = user.tickets?.map(t => {
        return {
            ticketId: t._id,
            flight: t.flight,
            seats: t.seats,
        }
    })

    return Ok(res, null, parsedTickets);

})

module.exports = router;