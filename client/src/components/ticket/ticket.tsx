import React from 'react';
import ITicket from '../../interfaces/ticket.interface';
import ISeat from '../../interfaces/seat.interface';

export default function Ticket({ ticket } : {ticket:ITicket}) {

    const firstClassSeats:string = getSeats(ticket.seats, 'first');
    const bussinessClassSeats:string = getSeats(ticket.seats, 'bussiness');
    const economyClassSeats:string = getSeats(ticket.seats, 'economy');

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

function getSeats(seats:ISeat[], seatClass:string) {
    return seats?.filter(s => s.section.seatClass === seatClass)
        .reduce((acc, curr) => {return acc + curr.seatNumber +", "}, "");
}