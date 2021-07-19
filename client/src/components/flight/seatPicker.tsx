import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation , useHistory } from "react-router-dom"

import IFlight from '../../interfaces/models/flight.interface';
import { getFlight, requestFlightById } from '../../store/reducers/flightReducer';
import {selectSeatsActions} from '../../store/reducers/ticketsReducer';
import { getIsLogged } from '../../store/reducers/authReducer';

import FlightDetails from './flightDetails';

export default function SeatPicker() {
    const dispatch = useDispatch();
    const history = useHistory();
    const location: any = useLocation();
    const isLogged = useSelector(getIsLogged);

    const [flights, setFlights] = React.useState<IFlight[]>([]);
    const [mappedFlights, setMappedFlights] = React.useState<any>();
    const [mappedDetails, setMappedDetails] = React.useState<any>();
    const currentFlight: IFlight = useSelector(getFlight);
    const {flightIds , oneWay}:{flightIds: string[] , oneWay:boolean} = location.state;

    const [toSeats , setToSeats] = React.useState<any>()
    const [returnSeats , setReturnSeats] = React.useState<any>()

    React.useEffect(() => {
        for (let id of flightIds)
            dispatch(requestFlightById(id))
    }, [dispatch, flightIds])


    React.useEffect(() => {
        if (currentFlight) {
            if (flightIds.indexOf(currentFlight._id) > -1) {
                let contains = false;
                flights.forEach(flight => {

                    if (flight._id === currentFlight._id) {
                        contains = true;
                    }
                });

                if (!contains && currentFlight) {
                    setFlights([...flights, currentFlight])
                }
            }

        }
    }, [currentFlight, flights, flightIds])

    React.useEffect(() => {
        setMappedDetails(flights.map((f, index) => {
            return <p key={index}>{f.originAirport.name} {'->'} {f.destinationAirport.name} : {index === 0 ? (toSeats ? toSeats.length : 0 ) : (returnSeats ? returnSeats.length : 0)}</p>
        } ,[toSeats , returnSeats]));


        setMappedFlights(flights.map((flight , index) => {
            return (<FlightDetails key={flight._id} flight={flight} setSeats={index === 0 ? setToSeats : setReturnSeats} />)
        } , []));

    }, [flights, toSeats , returnSeats]);


    const handleClick = () => {

        if(!isLogged){
            alert('Please login to continue reserving')
            history.push('/login');
            return;
        }


        if(toSeats && toSeats.length > 0){
            if(oneWay && (!returnSeats || (returnSeats && returnSeats.length === 0))){
                alert('Please select return seats');
                return;
            }

            dispatch({type:selectSeatsActions.SUCCESS , payload:[toSeats , returnSeats]});
            history.push(`/flight/ticketsForms` , flightIds);
        }
        else{
            alert('Please select from origin to destination seats')
        }
    }

    return (
        <div className="center-horizontally">
            <div className="reserves">
                <div className="reserves_seats-details">
                    {mappedDetails ? mappedDetails : null}
                    <button className="btn btn-primary" onClick={handleClick}>Continue</button>
                </div>
                <div className="reserves_flights">
                    {mappedFlights ? mappedFlights : 'Something went wrong'}
                </div>
            </div>
        </div>
    )
}