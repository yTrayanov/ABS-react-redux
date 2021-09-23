import ITicket from "./ticket.interface";


export default interface ISeat{
    id:string,
    row:number,
    column:number,
    isBooked:boolean,
    seatNumber:string,
    passengerName:string | undefined,
    ticket:ITicket | null,
    seatClass:string,
    username:string
}