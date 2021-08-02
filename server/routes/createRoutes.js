const express = require('express');
const router = new express.Router();
const Airline = require('../models/Airline');
const Airport = require('../models/Airport');
const Section = require('../models/Section');
const Seat = require('../models/Seat');
const Flight = require('../models/Flight')
const { BadRequest, Created } = require('./responses');


router.post('/airline', (req, res) => {
    const airline = req.body;
    Airline.create(airline).then(() => {
        return Created(res, 'Airline created successfully');
    })
        .catch(e => {
            return res.BadRequest(res, e.message, e);
        })
});


router.post('/airport', (req, res) => {
    Airport.create(req.body).then((airport) => {
        return Created(res, 'Airport created', airport);
    })
        .catch((e) => {
            return BadRequest(res, 'Airport couldn\'t be created', e);
        })
})


router.post('/section', async (req, res) => {

    const flight = await Flight.findOne({ flightNumber: req.body.flightNumber });

    if (!flight) {

        return BadRequest(res , 'Flight doesnt exist');
    }


    for (sectionId of flight.sections) {
        const section = await Section.findById(sectionId);
        if (req.body.seatClass === section.seatClass) {
            return BadRequest(res,'Flight already contains section');
        }
    }

    Section.create({
        rows: req.body.rows,
        columns: req.body.columns,
        seatClass: req.body.seatClass,
        availableSeats: req.body.rows * req.body.columns,
        flight
    }).then( async (section) => {

        let seats = [];
        for (let row = 0; row < req.body.rows; row++) {
            for (let column = 0; column < req.body.columns; column++) {
                seats.push(await Seat.create({
                    row,
                    column,
                    section,
                    seatNumber:(row+1) + String.fromCharCode(column+65),
                    section:section
                }))
            }
        }

        section.seats = seats;
        section.save();

        flight.sections.push(section);
        flight.save();

        return Created(res ,`Section class ${req.body.seatClass} created for flight ${req.body.flightNumber}`)
    })
        .catch((e) => {
            return BadRequest(res , e.message , e);
        })
});

module.exports = router;