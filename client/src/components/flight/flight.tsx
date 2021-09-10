import IFlight from '../../interfaces/models/flight.interface';


export default function Flight({ flight}
    : { flight: IFlight}) {

    return (
        <div className="home_flights_flight">
            <div className="flight-details">
                <p>{flight.airline} {'->'}</p>
                <p>{flight.originAirport} - {flight.destinationAirport}</p>
            </div>
            <div>{new Date(flight.departureDate).toLocaleString()} {" -> "} {new Date(flight.landingDate).toLocaleString()}</div>
        </div>
    )
}