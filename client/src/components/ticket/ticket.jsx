import React from 'react';

export default function Ticket({ticket}){

    const {flightNumber , seatClass , seatNumber } = ticket; // can take ticketId and seatId if needed


    return(
        <>
            <p>Flight: {flightNumber}</p>
            <p>Class: {seatClass}</p>
            <p>Seat: {seatNumber}</p>
            <p>-------------------------------</p>
        </>
    )
}