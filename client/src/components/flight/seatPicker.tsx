import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useHistory } from "react-router-dom"

import IFlight from '../../interfaces/models/flight.interface';
import { getFlightsByIds } from '../../store/reducers/flightReducer';
import { selectSeatsActions } from '../../store/reducers/ticketsReducer';
import { getIsLogged } from '../../store/reducers/authReducer';

import { requestFlightsByIds } from '../../actions/flight.actions';

import FlightDetails from './flightDetails';

export default function SeatPicker() {
    const dispatch = useDispatch();
    const history = useHistory();
    const location: any = useLocation();
    const [mappedFlights, setMappedFlights] = React.useState<any[]>([]);
    const [mappedDetails, setMappedDetails] = React.useState<any[]>([]);
    const [toDestinationSeats, setToDestinationSeats] = React.useState<any[]>([])
    const [returnSeats, setReturnSeats] = React.useState<any[]>([]);
    const [selectedReturnSeats, setSelectReturnSeats] = React.useState<boolean>(false)

    const isLogged = useSelector(getIsLogged);
    const flights: IFlight[] = useSelector(getFlightsByIds);

    const { flightIds, oneWay, membersCount }: { flightIds: string[], oneWay: boolean, membersCount: number } = location.state;

    React.useEffect(() => {
        dispatch(requestFlightsByIds(flightIds));
    }, [dispatch, flightIds])


    React.useEffect(() => {
        setMappedDetails(flights?.map((f, index) => {
            return <p key={index}
                className={`${index === 0 ? (!selectedReturnSeats ? 'selected' : '') : (selectedReturnSeats ? 'selected' : '')}`}
                onClick={() => { if (flightIds.length > 1) setSelectReturnSeats(!selectedReturnSeats) }}>
                {f.originAirport.name} {'->'} {f.destinationAirport.name} : {index === 0 ? (toDestinationSeats ? toDestinationSeats.length : 0) : (returnSeats ? returnSeats.length : 0)}
            </p>
        }));

        setMappedFlights(flights?.map((flight, index) => {
            return (<FlightDetails key={flight._id} flight={flight}
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

        if (toDestinationSeats.length !== membersCount) {
            alert('Invalid number of seats selected for to destination flight');
            return;
        }

        if (!oneWay && returnSeats.length !== membersCount) {
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
                    {mappedFlights ? mappedFlights : 'Something went wrong'}
                </div>
            </div>
        </div>
    )
}