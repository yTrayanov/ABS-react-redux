import React from "react";
import { useDispatch, useSelector } from "react-redux";

import Flight from "./flight";
import IFlight from "../../interfaces/models/flight.interface";
import { getAllFlights, requestAllFlights } from "../../store/reducers/flightReducer";


export default function AllFlights() {
    const dispatch = useDispatch();
    const flights: IFlight[] = useSelector(getAllFlights);
    const [mappedFlights, setMappedFlights] = React.useState<any>([]);

    React.useEffect(() => {
        dispatch(requestAllFlights());
    }, [dispatch]);

    React.useEffect(() => {
        setMappedFlights(
            flights?.map(flight => (
                <Flight originAirportName={flight.originAirport.name}
                    destinationAirportName={flight.destinationAirport.name}
                    airlineName={flight.airline.name}
                    departureDate={flight.departureDate}
                    key={flight.flightNumber}
                    url={`/flight/information/${flight._id}`} />
            )));
    },[flights]);


    return (
        <div className="container" style={{ textAlign: 'center', marginTop: '40px', border: mappedFlights ? '1px solid' : 'none', borderRadius: '30px' }}>
            <ul className="container col-lg-8" style={{ listStyle: "none", justifyContent: 'center', padding: 0 }}>
                {mappedFlights ? mappedFlights : null}
            </ul>
        </div>
    )
}