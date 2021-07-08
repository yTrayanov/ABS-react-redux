
export default interface IFlight {
    originAirport: {
        name: string
    },
    destinationAirport: {
        name: string
    },
    airline: {
        name: string
    },
    departureDate: Date,
    flightNumber: string,
    _id: string
}