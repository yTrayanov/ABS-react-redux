import React from 'react';
import { Link } from 'react-router-dom';


export default function Flight({ id, originAirportName, destinationAirportName, airlineName, departureDate }) {

    
    return (
        <li className="col-md-6">
            <Link to={`/flight/${id}`}>
                <div>
                    <p>Airline: {airlineName}</p>
                    <p>From {originAirportName} to {destinationAirportName} departs on {departureDate}</p>
                </div>
            </Link>
        </li>
    )

}