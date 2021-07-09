import React from 'react';
import { Link } from 'react-router-dom';


export default function Flight({ id, originAirportName, destinationAirportName, airlineName, departureDate }:{id:string , originAirportName:string ,destinationAirportName:string , airlineName:string , departureDate:Date}) {
    return (
        <Link className="flightLink" to={`/flight/${id}`} style={{ textDecoration: 'none', color: 'black'}}>
            <li style={{ borderBottom: "1px solid" }}>
                <div className="row flightLink">
                    <div className="col-lg-4">
                        <p style={{ "margin": 0 }} >{originAirportName} - {destinationAirportName}</p>
                        <p>{airlineName}</p>
                    </div>
                    <div className="col-lg-4">{new Date(departureDate).toLocaleString()}</div>
                </div>
            </li>
        </Link>
    )
}