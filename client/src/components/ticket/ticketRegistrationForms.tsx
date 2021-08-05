import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation, useHistory } from 'react-router-dom';

import SeatHoldersForm from './seatHoldersForm';

import ISeat from '../../interfaces/models/seat.interface';
import { getIsCreatingTickets, getSelectedSeats , getHasBookedSeats } from '../../store/slices/ticketSlice';
import { requestCreateTickets } from '../../actions/ticket.actions';
import LoadingButton from '../loadingButton';

interface ILocation {
    state: string[]
}

export const SeatHoldersContext = React.createContext<any>(null);

export default function TicketRegistrationForms() {
    const location: ILocation = useLocation();
    const dispatch = useDispatch();
    const history = useHistory();
    const flightIds: string[] = location.state;

    const [mappedForms, setMappedForms] = React.useState<object[]>([]);
    const [filledFormsCount, setFilledFormsCount] = React.useState<number>(0);

    const [seats, setSeats] = React.useState<ISeat[][]>(useSelector(getSelectedSeats));

    const incrementFilledFormsCount = React.useCallback((n: number) => {
        setFilledFormsCount(c => c + n);
    }, []);


    React.useEffect(() => {
        setMappedForms(flightIds?.map((id, index) => 
        <SeatHoldersForm key={id} currentSeats={seats[index]} index={index} />))
    }, [flightIds, seats])


    const bookSeats = React.useCallback((event: React.FormEvent<HTMLButtonElement>) => {
        event.preventDefault();

        const formsCount = seats?.reduce((acc: number, curr: ISeat[]) => {
            if (curr)
                return acc + curr.length;
            return acc;
        }, 0);

        if (filledFormsCount === formsCount) {
            dispatch(requestCreateTickets({
                flightIds,
                seats
            }));

        }
        else {
            alert('Please fill all fields');
        }

    }, [filledFormsCount, seats, dispatch, flightIds])


    if(useSelector(getHasBookedSeats)){
        history.push('/');
        return;
    }

    return (
        <div className="center-horizontally">
            <div className="ticket-registration">
                <SeatHoldersContext.Provider value={{
                    incrementFilledFormsCount,
                    setSeats,
                    allSeats: seats
                }} >
                    {mappedForms ? mappedForms : null}
                </SeatHoldersContext.Provider>
                <LoadingButton text="Purchase" onClick={bookSeats} loadingSelector={getIsCreatingTickets} />
            </div>
        </div>
    )
}