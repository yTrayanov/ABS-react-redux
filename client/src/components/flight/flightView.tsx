import React from "react";

import Flight from "./flight";
import IFlight from "../../interfaces/models/flight.interface";
import { Link } from "react-router-dom";

export default function FlightView({flights} : {flights:IFlight[]}) {

    
    const [mappedFlights, setMappedFlights] = React.useState<any>([]);
    const url = React.useRef<string>('');

    React.useEffect(() => {
        setMappedFlights(
            flights?.map(flight => (
                <Flight flight={flight}
                    key={flight.flightNumber} />
            )));

            if(flights) url.current = flights[0]._id;
    },[flights])

    return (
        <li>
            <Link to={`flight/${url.current}`} className="btn btn-primary" > {">"} </Link>
            {mappedFlights ? mappedFlights : null}
        </li>
    )
}