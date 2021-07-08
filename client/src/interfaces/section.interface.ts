import ISeat from './seat.interface';
import IFlight from './flight.interface';

export default interface ISection{
    _id:string,
    seats:ISeat[],
    rows:number,
    columns:number,
    seatClass:string,
    availableSeats:number,
    flight:IFlight
}