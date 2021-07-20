import React from "react";

import Flight from "./flight";
import IFlight from "../../interfaces/models/flight.interface";
import { Link } from "react-router-dom";

export default function FlightView({flights , oneWay , membersCount} : {flights:IFlight[] , oneWay:boolean  , membersCount:string | number}) {

    
    const [mappedFlights, setMappedFlights] = React.useState<any>([]);

    React.useEffect(() => {
        setMappedFlights(
            flights?.map(flight => {
                return (<Flight flight={flight} key={flight.flightNumber} />)
            }));

    },[flights])

    return (
        <li>
            <Link to={{pathname:'flight/reserve' , state:{flightIds:flights.map(f => f._id) , oneWay:oneWay , membersCount:membersCount }}} className="btn btn-primary" > {">"} </Link>
            {mappedFlights ? mappedFlights : null}
        </li>
    )
}