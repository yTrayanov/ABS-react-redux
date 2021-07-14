import IFlight from '../../interfaces/models/flight.interface';


export default function Flight({ flight}
    : { flight: IFlight}) {
    return (
        <div className="home_flights_flight">
            <div className="flight-details">
                <p>{flight.airline.name} {'->'}</p>
                <p>{flight.originAirport.name} - {flight.destinationAirport.name}</p>
            </div>
            <div className="date-container">{new Date(flight.departureDate).toLocaleString()}</div>
        </div>
    )
}