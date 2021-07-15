import React from "react";

import Flight from "./flight";
import IFlight from "../../interfaces/models/flight.interface";
import { Link } from "react-router-dom";

export default function FlightView({flights} : {flights:IFlight[] }) {

    
    const [mappedFlights, setMappedFlights] = React.useState<any>([]);

    React.useEffect(() => {
        setMappedFlights(
            flights?.map(flight => (
                <Flight flight={flight}
                    key={flight.flightNumber} />
            )));
    },[flights])

    return (
        <li>
            <Link to={`flight/${flights[0]._id}`} className="btn btn-primary" > {">"} </Link>
            {mappedFlights ? mappedFlights : null}
        </li>
    )
}