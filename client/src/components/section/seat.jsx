import React from 'react';
import { useSelector , useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { getIsLogged } from '../../store/reducers/authReducer';
import { requestTicket } from '../../store/reducers/ticketsReducer';

export default function Seat({ seat, flightId, seatClass }) {
    const history = useHistory();
    const dispatch = useDispatch();

    const [booked, setBooked] = React.useState(seat.isBooked);
    const isLogged = useSelector(getIsLogged);

    const handleClick = () => {
        if (isLogged && !seat.isBooked) {
            dispatch(requestTicket(flightId , seatClass ,seat.row , seat.column));
            setBooked(true);
        }
        else{
            history.push('/login');
        }
    }

    return (
        <div onClick={handleClick} className={`col-1 text-${booked ? "danger" : "success"}`}>
            <p>{seat.seatNumber}</p>
        </div>
    )
}