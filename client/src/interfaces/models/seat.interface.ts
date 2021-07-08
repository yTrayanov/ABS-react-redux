import ISection from "./section.interface";


export default interface ISeat{
    _id:string,
    row:number,
    column:number,
    isBooked:boolean,
    seatNumber:string,
    section:ISection,
}