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
        landingDate: Date.parse(req.body.landingDate),
        airline,
        originAirport,
        destinationAirport,
    }).then((flight) => {
        return Created(res, 'Flight from ' + originAirport.name + ' to ' + destinationAirport.name + ' was created with airline ' + airline.name, flight);
    })
        .catch((e) => {
            return BadRequest(res , " Flight could not be created" , e.message);
        })
});

router.get('/filter/:origin/:destination/:departureDate/:membersCount', async (req, res) => {

    const originAirport = await Airport.findOne({ name: req.params.origin });
    const destinationAirport = await Airport.findOne({ name: req.params.destination });
    const departureDate = new Date(req.params.departureDate).toDateString();
    const membersCount = parseInt(req.params.membersCount);

    const flights = await getFlights(originAirport, destinationAirport, departureDate , membersCount);

    if(!flights){
        return Ok(res , `There are no flights from ${originAirport.name} to ${destinationAirport.name}`);
    }

    //Mapping to array is needed here becouse the front end works with one way flights and two way flights
    return Ok(res, 'Filtered flights', flights.map(f =>[f]));
});

router.get('/filter/:origin/:destination/:departureDate/:membersCount/:returnDate/', async (req, res) => {
    const originAirport = await Airport.findOne({ name: req.params.origin });
    const destinationAirport = await Airport.findOne({ name: req.params.destination });
    const departureDate = new Date(req.params.departureDate).toDateString();
    const membersCount = req.params.membersCount;

    const toDestinationFlights = await getFlights(originAirport , destinationAirport , departureDate , membersCount);

    if (!toDestinationFlights)
        return Ok(res, 'There are no flights with those destinations and dates');

    const returnDate = new Date(req.params.returnDate).toDateString();
    const returnFlights = await getFlights(destinationAirport , originAirport , returnDate , membersCount);

    if (!returnFlights)
        return Ok(res, 'There are no flights with those destinations and dates');

    let flights = [];
    for (toFlight of toDestinationFlights) {
        for (returnFlight of returnFlights) {
            flights.push([toFlight, returnFlight]);
        }
    }

    return Ok(res, 'Flights found', flights);
})


router.get('/:ids', async (req, res) => {

    const ids = req.params.ids.split(',');
    const flights = []

    for (id of ids) {
        const flight = await Flight.findById(id)
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

        flights.push(flight);
    }

    return Ok(res, 'Flights found', flights);
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

                if (section.availableSeats === section.rows * section.columns) {
                    flight.sections.splice(index, 1);
                }
                else {
                    section.seats = section.seats.filter(s => s.isBooked);
                }
            }

            return Ok(res, 'All flight data', flight);
        })
})

function checkSectionsForSeats(membersCount, flights) {
    let toBeRemoved = [];
    for (flightIndex in flights) {
        let flightHasAvailableSeats = false;

        for (sectionIndex in flights[flightIndex].sections) {
            const currentSection = flights[flightIndex].sections[sectionIndex];
            if (currentSection.availableSeats >= membersCount) {
                flightHasAvailableSeats = true;
                break;
            }
        }

        if (!flightHasAvailableSeats) {
            toBeRemoved.push(flightIndex);
        }
    }

    for (index of toBeRemoved.reverse()) {
        flights.splice(index, 1);
    }


    return flights;
}

function getFlights(origin, destination, departureDate , membersCount) {

    return Flight.find({ originAirport: origin, destinationAirport: destination })
        .populate('originAirport')
        .populate('destinationAirport')
        .populate('airline')
        .populate('sections')
        .then(flights => {
            const filteredByDateFlights = flights.filter(f => f.departureDate.toDateString() === departureDate);
            return checkSectionsForSeats(membersCount, filteredByDateFlights);
        })
}


module.exports = router;