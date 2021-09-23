import React from "react";
import ISeat from "../../interfaces/models/seat.interface";
import { TicketContext } from "./ticketRegistrationForms";
import { FormGroupInput } from "../formInput";
import SectionClassMapper from "../sectionClassMapper";


interface Props {
    currentSeat: ISeat;
    seatIndex:number;
    direction:number;
}

export default function TicketForm({ currentSeat , seatIndex , direction}: Props) {
    const nameInput = React.useRef<HTMLInputElement>(null);

    const { incrementCount , changeSeat } = React.useContext(TicketContext);

    const handleChange = () => {

        if (nameInput.current)
            if (nameInput.current.value.length === 1) {
                incrementCount(1);
            }
            else if (nameInput.current.value.length === 0) {
                incrementCount(-1);
            }
    }

    const handleBlur = () => {
        if(nameInput.current)
            changeSeat(direction , seatIndex , nameInput.current.value);
    }



    return (
        <div className="container seat-form" >
            <div className='row'>
                <div className="col-lg-4">
                    <p>{currentSeat.seatNumber} / <SectionClassMapper seatClass={currentSeat.seatClass} /></p>

                </div>
                <div className="col-lg-5">
                    <FormGroupInput
                        type='text'
                        iconClass="fa fa-user"
                        placeholder="Seat holder full name"
                        ref={nameInput}
                        onChange={handleChange}
                        onBlur={handleBlur} />
                </div>
            </div>
        </div>
    )
}