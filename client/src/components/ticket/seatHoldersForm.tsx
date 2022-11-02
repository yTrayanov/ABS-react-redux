import React from "react";

import ISeat from "../../interfaces/models/seat.interface";

import TicketForm from './ticketForm';

interface Props{
    seats: ISeat[];
    direction: number;
};

export default function SeatHoldersForm({ seats , direction } : Props) {


    const [mappedSeats, setMappedSeats] = React.useState<React.ReactNode>([]);


    React.useEffect(() => {
        setMappedSeats(seats?.map((s,i) =>
             <TicketForm key={s.id} currentSeat={s} seatIndex={i} direction={direction} />))
    }, [seats,direction])


    return (
        <div className="ticket-registration_seats-form">
            <p>{direction===0 ? "To destination seats" : "Return seats"}</p>
            {mappedSeats ? mappedSeats : null}
        </div>

    )
}