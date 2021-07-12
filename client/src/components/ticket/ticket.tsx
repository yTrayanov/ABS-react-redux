import ITicket from '../../interfaces/models/ticket.interface';

export default function Ticket({ ticket } : {ticket:ITicket}) {
    return (
        <>
            <div style={{ borderBottom: "1px solid" }}>
                <p>Flight number: {ticket.flight.flightNumber}</p>
                <p>From {ticket.flight.originAirport.name} to {ticket.flight.destinationAirport.name} </p>
                <p>Departs on: {new Date(ticket.flight.departureDate).toLocaleString()}</p>
                <p>Class: {ticket.seat?.section.seatClass}</p>
                <p>Seat: {ticket.seat?.seatNumber}</p>
            </div>
        </>
    )
}
