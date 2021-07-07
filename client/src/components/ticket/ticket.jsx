import React from 'react';


export default function Ticket({ ticket }) {

    const firstClassSeats = getSeats(ticket.seats, 'first');
    const bussinessClassSeats = getSeats(ticket.seats, 'bussiness');
    const economyClassSeats = getSeats(ticket.seats, 'economy');

    return (
        <>
            <div style={{ borderBottom: "1px solid" }}>
                <p>Flight number: {ticket.flight.flightNumber}</p>
                <p>Departs on: {new Date(ticket.flight.departureDate).toLocaleString()}</p>
                 {firstClassSeats ? <p>First  - {firstClassSeats}</p> : null}
                {bussinessClassSeats ? <p>Bussiness -{bussinessClassSeats}</p> : null}
                {economyClassSeats ? <p>Economy - {economyClassSeats}</p> : null} 
            </div>
        </>
    )
}

function getSeats(seats, seatClass) {
    return seats?.filter(s => s.section.seatClass === seatClass)
        .reduce((acc, curr) => {return acc + curr.seatNumber +", "}, "");
}