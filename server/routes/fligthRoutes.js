const express = require('express');

const router = new express.Router();
const Flight = require('../models/Flight');
const Airport = require('../models/Airport');
const Airline = require('../models/Airline');
const Ticket = require('../models/Ticket');

const { BadRequest, Created, Ok, Unauthorized } = require('./responses');

router.post('/create', async (req, res) => {

    const originAirport = await Airport.findOne({ name: req.body.originAirport });
    const destinationAirport = await Airport.findOne({ name: req.body.destinationAirport });
    const airline = await Airline.findOne({ name: req.body.airline });

    Flight.create({
        flightNumber: req.body.flightNumber,
        departureDate: Date.parse(req.body.departureDate),
        airline,
        originAirport,
        destinationAirport,
    }).then((flight) => {
        return Created(res, 'Flight from ' + originAirport.name + ' to ' + destinationAirport.name + ' was created with airline ' + airline.name, flight);
    })
        .catch((e) => {
            res.status(400).json({
                success: false,
                message: 'Flight couldn\'t be created',
                error: e.message
            })
        })
});

router.get('/filter/:origin/:destination/:date', async (req, res) => {

    const originAirport = await Airport.findOne({ name: req.params.origin });
    const destinationAirport = await Airport.findOne({ name: req.params.destination });
    const departureDate = new Date(req.params.date).toDateString();



    Flight.find({ originAirport, destinationAirport })
        .populate('originAirport')
        .populate('destinationAirport')
        .populate('airline')
        .then(flights => {
            return Ok(res, 'Filtered flights', flights.filter(f => f.departureDate.toDateString() === departureDate));
        })
});

router.get('/:id', async (req, res) => {
    const flight = await Flight.findById(req.params.id)
        .populate('sections')
        .populate({
            path: 'sections',
            populate: 'seats',
        });


    if (!flight) {
        return BadRequest(res, 'Flight couldn\'t be found');
    }
    return Ok(res, 'Flight found', flight);
});

router.get('/information/all', (req, res) => {

    Flight.find()
        .populate('originAirport')
        .populate('destinationAirport')
        .populate('airline')
        .then(flights => {
            return Ok(res, 'All flights', flights);
        })

})

router.get('/information/:id', (req, res) => {

    if (!req.user) {
        return Unauthorized(res, 'Be gone , you are not logged');
    }

    if (!req.user.roles.indexOf('Admin') < 0) {
        return Unauthorized(res, 'Be gone , only admins allowed');
    }

    Flight.findById(req.params.id)
        .populate('originAirport')
        .populate('destinationAirport')
        .populate('airline')
        .populate({
            path: 'sections',
            populate: [{
                path: 'seats',
                populate: {
                    path: 'ticket',
                    populate:{
                        path:'user',
                    }
                }
            }]
        }).then(flight => {

            for (index in flight.sections) {

                const section = flight.sections[index];

                if (section.availableSeats == section.rows * section.columns) {
                    flight.sections.splice(index, 1);
                }
                else {
                    section.seats = section.seats.filter(s => s.isBooked);
                }
            }

            return Ok(res, 'All flight data', flight);
        })
})

module.exports = router;