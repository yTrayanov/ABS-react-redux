import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from "react-router"

import IFlight from '../../interfaces/models/flight.interface';
import { getFlight, requestFlightById } from '../../store/reducers/flightReducer';
import FlightDetails from './flightDetails';

export default function ReserveFlights() {
    const dispatch = useDispatch();
    const location:any = useLocation();
    const [flights , setFlights] = React.useState<IFlight[]>([]);
    const [mappedFlights , setMappedFlights] = React.useState<any>();
    const flightIds:string[] = location.state.flightIds;
    const currentFlight:IFlight = useSelector(getFlight);


    React.useEffect(() => {
        for(let id of flightIds)
            dispatch(requestFlightById(id))
    },[dispatch , flightIds])

    React.useEffect(() => {

        if(currentFlight){
            let contains = false;
            flights.forEach(flight => {
                if(flight._id === currentFlight._id){
                    contains = true;
                }
            });

            if(!contains){
                setFlights([...flights , currentFlight])
            }
        }
    },[currentFlight, flights] )

    React.useEffect(() => {
        setMappedFlights(flights.map((flight ) => {
            return (<FlightDetails key={flight._id} flight={flight} />)
        }));
    },[flights])

    return(
        <div>
            {mappedFlights? mappedFlights : 'Something went wrong'}
        </div>
    )
}