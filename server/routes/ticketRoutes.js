const express = require('express');
const router = new express.Router();
const Airport = require('../models/Airport')
const Airline = require('../models/Airline');
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

    const flights = [];
    for (flightId of req.body.flightIds) {

        const flight = await Flight.findById(flightId)
            .populate('sections')
            .populate({
                path: 'sections',
                populate: 'seats'
            });

        flights.push(flight);
    }

    if (!flights) {
        return BadRequest(res, 'There are no flights with those ids');
    }

    for (index in req.body.seats) {
        for (item of req.body.seats[index]) {

            const seat = await Seat.findById(item._id).populate('section');

            if (!seat) {
                return BadRequest(res, 'Seat doesn\'t exist');
            }

            if (seat.isBooked) {
                return BadRequest(res, 'Seat is already booked');
            }

            if (!item.passengerName) {
                return BadRequest(res, 'Passenger name is required');
            }

            seat.isBooked = true;


            const ticket = await Ticket.create({
                flight:flights[index],
                seat,
                user: req.user._id,
                passengerName: item.passengerName
            });
            
            seat.ticket = ticket;
            seat.save();

            req.user.tickets.push(ticket);
            req.user.save();

            seat.section.availableSeats -= 1;
            seat.section.save();
        }

    }


    return Ok(res, `Seats booked successfully`);

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
                path: 'flight',
                populate: [{
                    path: 'originAirport',
                    model: Airport
                }, {
                    path: 'destinationAirport',
                    model: Airport
                }, {
                    path: 'airline',
                    model: Airline
                }]
            },
            {
                path: 'seat',
                populate: [{
                    path: 'section',
                    model: Section
                }],
            }]
        });

    if (!user) {
        return BadRequest(res, 'User not found');
    }

    const parsedTickets = user.tickets?.map(t => {

        return {
            id: t._id,
            passengerName: t.passengerName,
            flight: t.flight,
            seat: t.seat,
        }
    })

    return Ok(res, null, parsedTickets);

})

module.exports = router;