import React from "react";

import ISeat from "../../interfaces/models/seat.interface";

import TicketForm from './ticketForm';

export default function SeatHoldersForm({ currentSeats , index} : { currentSeats:ISeat[] ,  index:number}) {


    const [mappedSeats, setMappedSeats] = React.useState<object[]>([]);

    
    React.useEffect(() => {
        setMappedSeats(currentSeats?.map(s =>
             <TicketForm key={s.id} currentSeat={s}  index={index}  />))
    }, [currentSeats , index])


    return (
        <div className="ticket-registration_seats-form">
            <p>{index===0 ? "To destination seats" : "Return seats"}</p>
            {mappedSeats ? mappedSeats : null}
        </div>

    )
}