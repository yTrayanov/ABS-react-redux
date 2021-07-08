import IFlight from './flight.interface';
import ISeat from './seat.interface';

export default interface ITicket{
    ticketId:string,
    flight:IFlight,
    seats:ISeat[]
}