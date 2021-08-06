import ISection from "./section.interface";
import ITicket from "./ticket.interface";


export default interface ISeat{
    id:string,
    row:number,
    column:number,
    isBooked:boolean,
    seatNumber:string,
    section:ISection,
    passengerName:string,
    ticket:ITicket | null
}