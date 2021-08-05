import React from "react";
import ISeat from "../../interfaces/models/seat.interface";
import { SeatHoldersContext } from "./ticketRegistrationForms";


interface IContextProps{
    incrementFilledFormsCount:(n:number) => void,
    setSeats:(seats:ISeat[][]) => void,
    allSeats:ISeat[][]

}

export default function TicketForm({ currentSeat, index }: { currentSeat: ISeat, index: number }) {

    const nameInput = React.useRef<HTMLInputElement>(null);
    let {incrementFilledFormsCount , setSeats , allSeats} = React.useContext<IContextProps>(SeatHoldersContext);

    const checkIfFilled = React.useCallback(() => {
        if (nameInput.current) {
            if (nameInput.current.value.length === 1) {
                incrementFilledFormsCount(1);
            }
            else if (!nameInput.current.value) {
                incrementFilledFormsCount(-1)
            }

            const seatIndex = allSeats[index]?.indexOf(currentSeat);
            allSeats[index][seatIndex].passangerName = nameInput.current.value;
            setSeats(allSeats);
        }

    }, [incrementFilledFormsCount, allSeats , index , setSeats , currentSeat])

    return (
        <div className="container seat-form" >
            <div className='row'>
                <div className="col-lg-4">
                    <p>{currentSeat.seatNumber}</p>
                </div>
                <div className="col-lg-6">
                    <div className="form-group input-group">
                        <div className="input-group-prepend">
                            <span className="input-group-text"> <i className="fa fa-user"></i> </span>
                        </div>
                        <input type='text' className="form-control" placeholder="Seat holder full name" ref={nameInput} onChange={checkIfFilled} />
                    </div>
                </div>
            </div>
        </div>
    )
}