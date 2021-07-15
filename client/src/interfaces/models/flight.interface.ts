import ISection from "./section.interface";

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
    landingDate:Date,
    flightNumber: string,
    _id: string,
    sections:ISection[] | null,

}