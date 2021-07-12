import IFlight from './flight.interface';
import ISeat from './seat.interface';
import IUser from './user.interface';

export default interface ITicket{
    ticketId:string,
    flight:IFlight,
    seat:ISeat,
    passengerName:string,
    user:IUser
}