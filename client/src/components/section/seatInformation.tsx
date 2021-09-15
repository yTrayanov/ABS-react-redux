import ISeat from "../../interfaces/models/seat.interface";

export default function SeatInformation({seat} : {seat:ISeat}) {

    return (
        <div>
            <p>{seat.seatNumber} - {seat.passengerName} , booked by {seat.username}</p>
        </div>
        )

}