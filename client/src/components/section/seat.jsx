import React from 'react';
import {useSelector} from 'react-redux';

import {getIsLogged} from '../../store/authReducer';

import { postRequest } from '../../requests';
import { CREATE_TICKET_URL} from '../../urls';

export default function Seat({seat , flightId , seatClass}) {

    const isLogged = useSelector(getIsLogged);
    const [booked , setBooked] = React.useState(seat.isBooked);

    const handleClick = () =>{
        if(isLogged){
            postRequest(CREATE_TICKET_URL , {flightId ,seatClass ,row:seat.row ,column:seat.column})
                .then(response => {
                    if(response.success){
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