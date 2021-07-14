import React from "react";
import { useDispatch, useSelector } from "react-redux";

import IFlight from "../../interfaces/models/flight.interface";
import { getAllFlights, requestAllFlights } from "../../store/reducers/flightReducer";
import FlightView from "./flightView";


export default function AllFlights() {
    const dispatch = useDispatch();
    const flights: IFlight[][] = useSelector(getAllFlights);
    const [mappedFlights, setMappedFlights] = React.useState<any>([]);

    React.useEffect(() => {
        dispatch(requestAllFlights());
    }, [dispatch]);

    React.useEffect(() => {
        setMappedFlights(
            flights?.map((flight, index) => (
                <FlightView flights={flight}
                    urlStart={'/flight/information'}
                    key={index} />
            )));
    }, [flights]);


    return (
        <div className="container" style={{ textAlign: 'center', marginTop: '40px', border: flights ? '1px solid' : 'none', borderRadius: '30px' }}>
            <ul className="container col-lg-8" style={{ listStyle: "none", justifyContent: 'center', padding: 0 }}>
                {mappedFlights ? mappedFlights : null}
            </ul>
        </div>
    )
}