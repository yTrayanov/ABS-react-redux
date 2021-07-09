import React from "react";
import { useSelector, useDispatch } from 'react-redux';

import ISeat from "../../interfaces/models/seat.interface";
import { getSelectedSeats, requestCreateTickets } from "../../store/reducers/ticketsReducer";

import TicketForm from './ticketForm';

export default function RegisterTickets(props: any) {
    const dispatch = useDispatch();
    const flightId: string = props.match.params.id;

    const [seats, setSeats] = React.useState<ISeat[]>(useSelector(getSelectedSeats));
    const [mappedSeats, setMappedSeats] = React.useState<any>([]);
    const [filledFormsCount, setFilledFormsCount] = React.useState<number>(0);

    const incrementFilledFomrsCount = React.useCallback((n: number) => {
        setFilledFormsCount(c => c + n);
    }, []);

    const changeSeats = React.useCallback((seats: ISeat[]) => {
        setSeats(seats);
    }, [])

    React.useEffect(() => {
        setMappedSeats(seats?.map(
            (s: ISeat, index: number) => <TicketForm key={s._id} currentSeat={s} seats={seats} index={index} changeSeats={changeSeats} incrementFilledFomrsCount={incrementFilledFomrsCount} />))
    }, [seats, dispatch, incrementFilledFomrsCount, changeSeats])


    const bookSeats = React.useCallback((event) => {
        event.preventDefault();
        if (filledFormsCount === seats.length) {
            dispatch(requestCreateTickets(flightId, seats));
        }
        else {
            alert('Please fill all fields');
        }

    }, [filledFormsCount, seats, dispatch, flightId])


    return (
        <div style={{marginTop:'30px'}}>
            {mappedSeats ? mappedSeats : null}
            <div className="row">
                <div className="col-lg-4"></div>
                <button className="btn btn-primary btn-block col-lg-4" onClick={bookSeats} style={{marginTop:"30px"}}>Purchase</button>
            </div>
        </div>

    )
}