import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation, useHistory } from 'react-router-dom';

import SeatHoldersForm from './seatHoldersForm';

import ISeat from '../../interfaces/models/seat.interface';
import { getSelectedSeats, getIsCreatingTickets, getReadySeats, clearSeats } from '../../store/slices/ticketSlice';
import { requestCreateTickets } from '../../actions/ticket.actions';
import LoadingButton from '../loadingButton';

interface ILocation {
    state: string[]
}

export const TicketContext = React.createContext<any>(null);

export default function TicketRegistrationForms() {
    const dispatch = useDispatch();
    const history = useHistory();
    const location: ILocation = useLocation();
    const flightIds: string[] = location.state;

    const [mappedForms, setMappedForms] = React.useState<object[]>([]);
    const filledFormsCount = React.useRef<number>(0);

    const seats: ISeat[][] = useSelector(getSelectedSeats);
    const readySeats: ISeat[][] = useSelector(getReadySeats);

    React.useEffect(() => {
        setMappedForms(flightIds?.map((id, index) =>
            <SeatHoldersForm key={id} currentSeats={seats[index]} index={index} />))
    }, [flightIds, seats])

    const incrementCount = React.useCallback((n: number) => {
        filledFormsCount.current += n;
    }, []);

    const bookSeats = async (event: React.FormEvent<HTMLButtonElement>) => {
        event.preventDefault();

        const formsCount = seats?.reduce((acc: number, curr: ISeat[]) => {
            if (curr)
                return acc + curr.length;
            return acc;
        }, 0);

        if (filledFormsCount.current !== formsCount)
            alert('Please fill and check all forms');

            
        const result: any = await dispatch(requestCreateTickets({ flightIds, seats: readySeats }));
        if (result.type === requestCreateTickets.fulfilled.type) {
            await dispatch(clearSeats());
            history.push('/');
        }
    }

    return (
        <div className="center-horizontally">
            <div className="ticket-registration">
                <TicketContext.Provider value={{ incrementCount }}>
                    {mappedForms ? mappedForms : null}
                </TicketContext.Provider>
                <LoadingButton text="Purchase" onClick={bookSeats} loadingSelector={getIsCreatingTickets} />
            </div>
        </div>
    )
}