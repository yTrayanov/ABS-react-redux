import React from "react";
import { useDispatch, useSelector } from "react-redux";

import IFlight from "../../interfaces/models/flight.interface";
import { getAllFlights } from "../../store/slices/flight.slice";
import { requestAllFlights } from "../../actions/flight.actions";

import AdminFlightView from "./AdminFlightView";
import { AppDispatch } from "../../store/store";


export default function AllFlights() {
    const dispatch = useDispatch<AppDispatch>();
    const flights: IFlight[] = useSelector(getAllFlights);
    const [mappedFlights, setMappedFlights] = React.useState<React.ReactNode>([]);

    React.useEffect(() => {
        dispatch(requestAllFlights());
    }, [dispatch]);

    React.useEffect(() => {
        setMappedFlights(
            flights?.map((flight) => (
                <AdminFlightView flight={flight}
                    key={flight.id} />
            )));
    }, [flights]);


    return (
        <div className="center-horizontally">
            <ul className="all-flights">
                {mappedFlights ? mappedFlights : null}
            </ul>
        </div>
    )
}