import ISection from "./section.interface";
import ITicket from "./ticket.interface";


export default interface ISeat{
    _id:string,
    row:number,
    column:number,
    isBooked:boolean,
    seatNumber:string,
    section:ISection,
    passangerName:string,
    ticket:ITicket | null
}