export default interface ISeat{
    id:string,
    row:number,
    column:number,
    isBooked:boolean,
    seatNumber:string,
    passengerName:string | undefined,
    seatClass:string,
    username:string
}