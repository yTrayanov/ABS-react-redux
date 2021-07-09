import React from "react";
import ISeat from "../../interfaces/models/seat.interface";

export default function TicketForm({ currentSeat, seats, incrementFilledFomrsCount, changeSeats, index }
    : { currentSeat: ISeat, seats: ISeat[], incrementFilledFomrsCount: (n: number) => void, changeSeats: (seats: ISeat[]) => void, index: number }) {

    const nameInput = React.useRef<HTMLInputElement>(null);

    const checkIfFilled = React.useCallback(() => {
        if (nameInput.current) {
            if (nameInput.current.value.length === 1) {
                incrementFilledFomrsCount(1);
            }
            else if (!nameInput.current.value) {
                incrementFilledFomrsCount(-1)
            }

            seats[index].passangerName = nameInput.current.value;
            changeSeats(seats);
        }

    }, [incrementFilledFomrsCount, seats , index , changeSeats])

    return (
        <div className="container" style={{borderBottom:'1px solid' , marginTop:'30px'}}>
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