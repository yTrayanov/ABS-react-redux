const mongoose = require('mongoose');

const flightSchema = new mongoose.Schema({
    flightNumber: { type: mongoose.Schema.Types.String, required: true, unique: true },
    departureDate: { type: mongoose.Schema.Types.Date, required: true },
    airline: { type: mongoose.Schema.Types.ObjectId, ref: 'Airline' },
    originAirport: { type: mongoose.Schema.Types.ObjectId, ref: 'Airport' },
    destinationAirport: { type: mongoose.Schema.Types.ObjectId, ref: 'Airport' },
    sections: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Section' }]
})

const Flight = mongoose.model('Flight', flightSchema);

Flight.isAvailable = async (id) => {
    return await Flight.findById(id)
        .populate('sections')
        .then(flight => {
            for (section of flight.sections) {
                if (section.availableSeats > 0) {
                    return true;
                }
                return false;
            }
        })
}

module.exports = Flight;