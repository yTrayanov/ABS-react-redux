const express = require('express');

const router = new express.Router();
const Flight = require('../models/Flight');
const Airport = require('../models/Airport');
const Airline = require('../models/Airline');
const {BadRequest , Created , Ok} = require('./responses');

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
        return Created(res ,  'Flight from ' + originAirport.name + ' to ' + destinationAirport.name + ' was created with airline ' + airline.name , flight);
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
    const departureDate = req.params.date;


    Flight.find({ originAirport, destinationAirport, departureDate })
        .populate('originAirport')
        .populate('destinationAirport')
        .populate('airline')
        .then(flights => {
            return res.status(200).json(flights);
        })

});

router.get('/:id' ,async (req,res) =>{

    const flight = await Flight.findById(req.params.id)
        .populate('sections')
        .populate({
            path:'sections',
            populate:'seats',
        });


    if(!flight){
        return BadRequest(res , 'Flight couldn\'t be found');
    }

    return Ok(res , 'Flight found' , flight);
});


module.exports = router;