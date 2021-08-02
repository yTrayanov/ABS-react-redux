import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useHistory } from "react-router-dom"

import IFlight from '../../interfaces/models/flight.interface';
import ISeat from '../../interfaces/models/seat.interface';

import { getFlightsByIds } from '../../store/reducers/flightReducer';
import { selectSeatsActions } from '../../store/reducers/ticketsReducer';
import { getIsLogged } from '../../store/reducers/authReducer';

import { requestFlightsByIds } from '../../actions/flight.actions';
import { getIsGettingFlightsByIds } from '../../store/reducers/flightReducer';

import FlightDetails from './flightDetails';

interface ILocation{
    state:{
        flightIds:string[],
        oneWay:boolean,
        membersCount:string
    }
}

export default function SeatPicker() {
    const dispatch = useDispatch();
    const history = useHistory();
    const location: ILocation = useLocation();
    const [mappedFlights, setMappedFlights] = React.useState<object[]>([]);
    const [mappedDetails, setMappedDetails] = React.useState<object[]>([]);
    const [toDestinationSeats, setToDestinationSeats] = React.useState<ISeat[]>([])
    const [returnSeats, setReturnSeats] = React.useState<ISeat[]>([]);
    const [selectedReturnSeats, setSelectReturnSeats] = React.useState<boolean>(false)

    const isLogged = useSelector(getIsLogged);
    const flights: IFlight[] = useSelector(getFlightsByIds);
    const isLoading:boolean = useSelector(getIsGettingFlightsByIds);

    const { flightIds, oneWay, membersCount }= location.state;

    React.useEffect(() => {
        dispatch(requestFlightsByIds(flightIds));
    }, [dispatch, flightIds])


    React.useEffect(() => {
        setMappedDetails(flights?.map((flight, index) => {
            return <p key={index}
                className={`${index === 0 ? (!selectedReturnSeats ? 'selected' : '') : (selectedReturnSeats ? 'selected' : '')}`}
                onClick={() => { if (flightIds.length > 1) setSelectReturnSeats(!selectedReturnSeats) }}>
                {flight.originAirport.name} {'->'} {flight.destinationAirport.name} : {index === 0 ? (toDestinationSeats ? toDestinationSeats.length : 0) : (returnSeats ? returnSeats.length : 0)}
            </p>
        }));

        setMappedFlights(flights?.map((flight, index) => {
            return (<FlightDetails key={flight.id} flight={flight}
                setSeats={index === 0 ? setToDestinationSeats : setReturnSeats}
                shouldShow={index === 0 ? (selectedReturnSeats ? false : true) : (selectedReturnSeats ? true : false)} />)
        }));

    }, [toDestinationSeats, returnSeats, selectedReturnSeats, flightIds , flights]);


    const handleClick = () => {

        if (!isLogged) {
            alert('Please login to continue reserving')
            history.push('/login');
            return;
        }

        if (toDestinationSeats.length !== parseInt(membersCount)) {
            alert('Invalid number of seats selected for to destination flight');
            return;
        }

        if (!oneWay && returnSeats.length !== parseInt(membersCount)) {
            alert('Invalid number of seats selected for return flight');
            return;
        }


        if (toDestinationSeats && toDestinationSeats.length > 0) {
            const hasNotSelectedReturn = (!returnSeats || (returnSeats && returnSeats.length === 0));
            if (!oneWay && hasNotSelectedReturn) {
                alert('Please select return seats');
                return;
            }

            dispatch({ type: selectSeatsActions.SUCCESS, payload: [toDestinationSeats, returnSeats] });
            history.push(`/flight/ticketsForms`, flightIds);
        }
        else {
            alert('Please select from origin to destination seats')
        }
    }

    return (
        <div className="center-horizontally">
            <div className="reserves">
                <div className="reserves_seats-details">
                    <p>Seats count for each flight: {membersCount}</p>
                    {mappedDetails ? mappedDetails : null}
                    <button className="btn btn-primary" onClick={handleClick}>Continue</button>
                </div>
                <div className="reserves_flights">
                    {isLoading ? "Loading..." : mappedFlights ? mappedFlights : 'There are no flights'}
                </div>
            </div>
        </div>
    )
}