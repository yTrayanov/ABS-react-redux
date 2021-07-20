import React from "react";
import ISeat from "../../interfaces/models/seat.interface";

export default function TicketForm({ currentSeat, allSeats, incrementFilledFomrsCount, changeSeats, index }
    : { currentSeat: ISeat, allSeats: ISeat[][], incrementFilledFomrsCount: (n: number) => void, changeSeats: (seats: ISeat[][]) => void, index: number }) {

    const nameInput = React.useRef<HTMLInputElement>(null);

    const checkIfFilled = React.useCallback(() => {
        if (nameInput.current) {
            if (nameInput.current.value.length === 1) {
                incrementFilledFomrsCount(1);
            }
            else if (!nameInput.current.value) {
                incrementFilledFomrsCount(-1)
            }

            const seatIndex = allSeats[index]?.indexOf(currentSeat);
            allSeats[index][seatIndex].passangerName = nameInput.current.value;
            changeSeats(allSeats);
        }

    }, [incrementFilledFomrsCount, allSeats , index , changeSeats , currentSeat])

    return (
        <div className="container seat-form" >
            <div className='row'>
                <div className="col-lg-4">
                    <p>{currentSeat.seatNumber}</p>
                    <p>{currentSeat.section.seatClass}</p>
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