import React from "react";

import ISeat from "../../interfaces/models/seat.interface";

import TicketForm from './ticketForm';

export default function RegisterTickets({incrementFilledFomrsCount , changeSeats , currentSeats , allSeats , index} : {incrementFilledFomrsCount:any , changeSeats:any , currentSeats:ISeat[] , allSeats:ISeat[][] , index:number}) {


    const [mappedSeats, setMappedSeats] = React.useState<any>([]);

    
    React.useEffect(() => {
        setMappedSeats(currentSeats?.map(
            (s: ISeat ) =>
             <TicketForm key={s._id} currentSeat={s} allSeats={allSeats} index={index} changeSeats={changeSeats} incrementFilledFomrsCount={incrementFilledFomrsCount} />))
    }, [currentSeats, incrementFilledFomrsCount, changeSeats , allSeats , index])


    return (
        <div style={{ marginTop: '30px' }}>
            {mappedSeats ? mappedSeats : null}
        </div>

    )
}