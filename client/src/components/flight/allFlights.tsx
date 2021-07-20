import React from "react";
import { useDispatch, useSelector } from "react-redux";

import IFlight from "../../interfaces/models/flight.interface";
import { getAllFlights } from "../../store/reducers/flightReducer";
import { requestAllFlights } from "../../actions/flight.actions";

import AdminFlightView from "./adminFlightView";


export default function AllFlights() {
    const dispatch = useDispatch();
    const flights: IFlight[] = useSelector(getAllFlights);
    const [mappedFlights, setMappedFlights] = React.useState<any[]>([]);

    React.useEffect(() => {
        dispatch(requestAllFlights());
    }, [dispatch]);

    React.useEffect(() => {
        setMappedFlights(
            flights?.map((flight) => (
                <AdminFlightView flight={flight}
                    key={flight._id} />
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