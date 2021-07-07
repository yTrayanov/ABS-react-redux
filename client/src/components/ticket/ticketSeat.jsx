import React from 'react';

export default function TicketSeat({seatNumber , seatClass}) {


    return (
        <div>
            <p>{seatClass} - {seatNumber}</p>
        </div>
    )
}