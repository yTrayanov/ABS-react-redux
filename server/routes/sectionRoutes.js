const express = require('express');
const router = new express.Router();
const {BadRequest , Created , Ok} = require('./responses');
const Flight = require('../models/Flight');
const Section = require('../models/Section');
const Seat = require('../models/Seat');


router.post('/create', async (req, res) => {

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
        availableSeats: req.body.rows * req.body.columns
    }).then( async (section) => {

        let seats = [];
        for (let row = 0; row < req.body.rows; row++) {
            for (let column = 0; column < req.body.columns; column++) {
                seats.push(await Seat.create({
                    row,
                    column,
                    section,
                    seatNumber:(row+1) + String.fromCharCode(column+65)
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

router.get('/:Id' , async (req , res) =>{
    
})

module.exports = router;