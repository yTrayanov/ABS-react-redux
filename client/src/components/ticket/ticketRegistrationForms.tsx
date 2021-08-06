import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation, useHistory } from 'react-router-dom';

import SeatHoldersForm from './seatHoldersForm';

import ISeat from '../../interfaces/models/seat.interface';
import { getSelectedSeats, getHasBookedSeats, getIsCreatingTickets , getReadySeats, clearSeats } from '../../store/slices/ticketSlice';
import { requestCreateTickets } from '../../actions/ticket.actions';
import LoadingButton from '../loadingButton';

interface ILocation {
    state: string[]
}

export default function TicketRegistrationForms() {
    const dispatch = useDispatch();
    const history = useHistory();
    const location: ILocation = useLocation();
    const flightIds: string[] = location.state;

    const [mappedForms, setMappedForms] = React.useState<object[]>([]);

    const seats: ISeat[][] = useSelector(getSelectedSeats);
    const readySeats:ISeat[][] = useSelector(getReadySeats);

    React.useEffect(() => {
        setMappedForms(flightIds?.map((id, index) =>
            <SeatHoldersForm key={id} currentSeats={seats[index]} index={index} />))
    }, [flightIds, seats])


    if (useSelector(getHasBookedSeats)) {
        dispatch({type:requestCreateTickets.rejected.type});
        dispatch(clearSeats());
        history.push('/');
        return;
    }

    const bookSeats = (event: React.FormEvent<HTMLButtonElement>) => {
        event.preventDefault();
        dispatch(requestCreateTickets({ flightIds, seats:readySeats }));
    }

    

    return (
        <div className="center-horizontally">
            <div className="ticket-registration">
                {mappedForms ? mappedForms : null}
                <LoadingButton text="Purchase" onClick={bookSeats} loadingSelector={getIsCreatingTickets} />
            </div>
        </div>
    )
}