import React from "react";
import ISeat from "../../interfaces/models/seat.interface";
import { addSeat, removeSeat } from "../../store/slices/ticket.slice";
import { useDispatch } from "react-redux";
import { TicketContext } from "./ticketRegistrationForms";
import { FormGroupInput } from "../formInput";


export default function TicketForm({ currentSeat, index }: { currentSeat: ISeat, index: number }) {
    const dispatch = useDispatch();
    const nameInput = React.useRef<HTMLInputElement>(null);
    const [checked, setChecked] = React.useState<boolean>(false);

    const { incrementCount } = React.useContext(TicketContext);

    const toggleReady = (e: any) => {
        if (nameInput.current && nameInput.current.value.length > 0) {
            setChecked(e.target.checked);
            const newSeat = { ...currentSeat, passengerName: nameInput.current.value }
            if (e.target.checked) {
                dispatch(addSeat({ seat: newSeat, index }));
                incrementCount(1);
            }
            else {
                dispatch(removeSeat({ seat: newSeat, index }));
                incrementCount(-1);
            }

        }
    }

    return (
        <div className="container seat-form" >
            <div className='row'>
                <div className="col-lg-4">
                    <p>{currentSeat.seatNumber}</p>

                </div>
                <div className="col-lg-5">
                    <FormGroupInput disabled={checked} type='text' iconClass="fa fa-user" placeholder="Seat holder full name" ref={nameInput} />
                </div>
                <div className="col-lg-3">
                    <div className="checkbox-container">
                        <input type="checkbox" onClick={toggleReady} readOnly checked={checked} />
                    </div>
                </div>
            </div>
        </div>
    )
}