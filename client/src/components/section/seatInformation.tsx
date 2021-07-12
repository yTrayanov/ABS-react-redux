import ISeat from "../../interfaces/models/seat.interface";

export default function SeatInformation({seat} : {seat:ISeat}) {


    return (
        <div>
            <p>{seat.seatNumber} - {seat.ticket?.passengerName} , booked by {seat.ticket?.user.username}</p>
        </div>
        )

}