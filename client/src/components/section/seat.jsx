import React from 'react';
import {useSelector} from 'react-redux';

import {getIsLogged} from '../../store/authReducer';
import ticketService from '../../services/ticket.service';

export default function Seat({seat , flightId , seatClass}) {

    const isLogged = useSelector(getIsLogged);
    const [booked , setBooked] = React.useState(seat.isBooked);

    const handleClick = () =>{
        if(isLogged){
            ticketService.createTicket(flightId , seatClass, seat.row , seat.column)
                .then((response) => response.json())
                .then((data) =>{
                    if(data.success){
                        setBooked(true);
                    }
                })
        }


    }

    return (
        <div onClick={handleClick} className={`col-1 text-${booked ? "danger" : "success"}`}>
            <p>{seat.seatNumber}</p>
        </div>
    )
}