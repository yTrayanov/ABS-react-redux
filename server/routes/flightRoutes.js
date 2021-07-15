const express = require('express');

const router = new express.Router();
const Flight = require('../models/Flight');
const Airport = require('../models/Airport');
const Airline = require('../models/Airline');

const { BadRequest, Created, Ok, Unauthorized } = require('./responses');

router.post('/create', async (req, res) => {

    const originAirport = await Airport.findOne({ name: req.body.originAirport });
    const destinationAirport = await Airport.findOne({ name: req.body.destinationAirport });
    const airline = await Airline.findOne({ name: req.body.airline });

    Flight.create({
        flightNumber: req.body.flightNumber,
        departureDate: Date.parse(req.body.departureDate),
        landingDate:Date.parse(req.body.landingDate),
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

router.get('/filter/:origin/:destination/:departureDate/:membersCount', async (req, res) => {

    const originAirport = await Airport.findOne({ name: req.params.origin });
    const destinationAirport = await Airport.findOne({ name: req.params.destination });
    const departureDate = new Date(req.params.departureDate).toDateString();
    const membersCount = parseInt(req.params.membersCount);

    Flight.find({ originAirport, destinationAirport })
        .populate('originAirport')
        .populate('destinationAirport')
        .populate('airline')
        .populate('sections')
        .then(flights => {
                let result = flights.filter(f => f.departureDate.toDateString() === departureDate);
                let toBeRemoved = [];

                
                for(flightIndex in result){
                    let flightHasAvailableSeats = false;

                    for(sectionIndex in result[flightIndex].sections){
                        const currentSection = result[flightIndex].sections[sectionIndex];
                        if( currentSection.availableSeats >= membersCount ){
                            flightHasAvailableSeats = true;
                            break;
                        }
                    }

                    if(!flightHasAvailableSeats){
                        toBeRemoved.push(flightIndex);
                    }
                }

                for(index of toBeRemoved.reverse()){
                    result.splice(index , 1);
                }


                result = result.map(f => [f]);
            return Ok(res, 'Filtered flights', result);
        })
});

router.get('/filter/:origin/:destination/:departureDate/:membersCount/:returnDate/', async (req, res) => {
    const originAirport = await Airport.findOne({ name: req.params.origin });
    const destinationAirport = await Airport.findOne({ name: req.params.destination });
    const departureDate = new Date(req.params.departureDate).toDateString();



    const toDestinationFlights = await Flight.find({ originAirport, destinationAirport })
        .populate('originAirport')
        .populate('destinationAirport')
        .populate('airline').then(flights => {
            return flights.filter(f => f.departureDate.toDateString() === departureDate)
        });

    if (!toDestinationFlights)
        return Ok(res, 'There are no flights with those destinations and dates');

    const returnDate = new Date(req.params.returnDate).toDateString();

    const returnFlights = await Flight.find({ originAirport:destinationAirport, destinationAirport:originAirport })
        .populate('originAirport')
        .populate('destinationAirport')
        .populate('airline').then(flights => {
            return flights.filter(f => f.departureDate.toDateString() === returnDate)
        });;

        console.log(returnFlights)

    if (!returnFlights)
        return Ok(res, 'There are no flights with those destinations and dates');

        let result = [];
        for(toFlight of toDestinationFlights){
            for(returnFlight of returnFlights){
                console.log(toFlight.flightNumber + ' - ' + returnFlight.flightNumber );
                result.push([toFlight , returnFlight]);
            }
        }

    return Ok(res, 'Flights found' , result);

})


router.get('/:id', async (req, res) => {
    const flight = await Flight.findById(req.params.id)
        .populate('originAirport')
        .populate('destinationAirport')
        .populate('airline')
        .populate({
            path: 'sections',
            populate: [{
                path: 'seats'
            }]
        })


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
                    populate: {
                        path: 'user',
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