import IFlight from './flight.interface';
import ISeat from './seat.interface';

export default interface ITicket{
    id:string,
    flight:IFlight,
    seat:ISeat,
    passengerName:string,
    username:string
}