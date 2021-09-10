import ISection from "./section.interface";

export default interface IFlight {
    originAirport: string,
    destinationAirport: string,
    airline: {
        name: string
    },
    departureDate: Date,
    landingDate:Date,
    flightNumber: string,
    id: string,
    sections:ISection[] | null,

}