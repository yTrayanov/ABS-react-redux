import { Link } from "react-router-dom";

import IFlight from "../../interfaces/models/flight.interface";



export default function AdminFlightView({flight} : {flight:IFlight}) {

    const departureDate = new Date(flight.departureDate);
    const landingDate = new Date(flight.landingDate);

    return (
        <Link to={`/flight/information/${flight.id}`}>
            <li className="all-flights_flight">
                <p>{flight.flightNumber}</p>
                <p>{flight.airline.name}</p>
                <p>{flight.originAirport.name} - {flight.destinationAirport.name}</p>
                <p>{departureDate.toLocaleDateString()}</p>
                <p>{departureDate.toLocaleTimeString()} - {landingDate.toLocaleTimeString()}</p>
            </li>
        </Link>
    )
}