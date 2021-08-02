import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation, useHistory } from 'react-router-dom';

import SeatHoldersForm from './seatHoldersForm';

import ISeat from '../../interfaces/models/seat.interface';
import { getIsCreatingTickets, getSelectedSeats } from '../../store/reducers/ticketsReducer';
import { requestCreateTickets } from '../../actions/ticket.action';
import LoadingButton from '../loadingButton';

interface ILocation{
    state:string[]
}

export default function TicketRegistrationForms() {
    const location: ILocation = useLocation();
    const dispatch = useDispatch();
    const history = useHistory();
    const flightIds: string[] = location.state;

    const [mappedForms, setMappedForms] = React.useState<object[]>([]);
    const [filledFormsCount, setFilledFormsCount] = React.useState<number>(0);

    const [seats, setSeats] = React.useState<ISeat[][]>(useSelector(getSelectedSeats));


    const changeSeats = React.useCallback((seats: ISeat[][]) => {
        setSeats(seats);
    }, [])

    const isLoading: boolean = useSelector(getIsCreatingTickets);

    const incrementFilledFomrsCount = React.useCallback((n: number) => {
        setFilledFormsCount(c => c + n);
    }, []);

    React.useEffect(() => {
        setMappedForms(flightIds?.map((id, index) => <SeatHoldersForm key={id} incrementFilledFomrsCount={incrementFilledFomrsCount} changeSeats={changeSeats} currentSeats={seats[index]} index={index} allSeats={seats} />))
    }, [flightIds, incrementFilledFomrsCount, changeSeats, seats])


    const bookSeats = React.useCallback((event: React.FormEvent<HTMLButtonElement>) => {
        event.preventDefault();

        const formsCount = seats?.reduce((acc: number, curr: ISeat[]) => {
            if (curr)
                return acc + curr.length;
            return acc;
        }, 0);

        if (filledFormsCount === formsCount) {
            dispatch(requestCreateTickets(flightIds, seats , history));

        }
        else {
            alert('Please fill all fields');
        }

    }, [filledFormsCount, seats, dispatch, flightIds, history])


    return (
        <div className="center-horizontally">
            <div className="ticket-registration">
                {mappedForms ? mappedForms : null}
                <LoadingButton text="Purchase" onClick={bookSeats} isLoading={isLoading} />
            </div>
        </div>
    )
}