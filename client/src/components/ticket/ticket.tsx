import ITicket from '../../interfaces/models/ticket.interface';
import {formatDistanceStrict} from 'date-fns';
import SectionClassMapper from '../sectionClassMapper';


const getTimeDiffrence = (departureDate:Date , landingDate:Date) => {
    const difference:string = formatDistanceStrict(departureDate , landingDate ,{unit:'minute'});
    const diffInMinutes:number = parseInt(difference.split(' ')[0]);
    const days = Math.floor(diffInMinutes/(24*60));
    const hours = Math.floor(diffInMinutes / 60 - days*24);
    const minutes:number = diffInMinutes - hours*60 - days*24*60;

    return `${days===0 ? '' : `${days} days`} ${hours === 0 ? '' : `${hours} hours `} ${minutes === 0 ? '' : `${minutes} minutes`}`;

}

export default function Ticket({ ticket } : {ticket:ITicket}) {

    const departureDate = new Date(ticket.flight.departureDate);
    const landingDate = new Date(ticket.flight.landingDate);

    const departureTime = departureDate.toLocaleTimeString();
    const landingTime = new Date(ticket.flight.landingDate).toLocaleTimeString();

    
    const timeDiffrence = getTimeDiffrence(departureDate , landingDate);

    return (
        <>
            <li className="tickets_ticket">
                <div className="ticket_part">
                    <p>{ticket.flight.airline}</p>
                    <p>{ticket.flight.flightNumber}</p>
                    <p>{departureDate.toLocaleDateString()}</p>
                </div>
                <div className="ticket_part">
                    <p>{ticket.passengerName}</p>
                    <p>{ticket.seat.seatNumber} / <SectionClassMapper seatClass={ticket.seat.seatClass} /></p>
                    <div className="date-container">
                        <p>{departureTime} {ticket.flight.originAirport}</p>
                        <p>{"->"}</p>
                        <p>{landingTime} {ticket.flight.destinationAirport}</p>
                    </div>
                    <p>{timeDiffrence}</p>
                </div>
            </li>
        </>
    )
}


