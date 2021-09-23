import React from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useHistory } from 'react-router-dom';

import SeatHoldersForm from './seatHoldersForm';

import ISeat from '../../interfaces/models/seat.interface';
import {getIsCreatingTickets } from '../../store/slices/ticket.slice';
import { requestCreateTickets } from '../../actions/ticket.actions';
import LoadingButton from '../loadingButton';

interface ILocation {
    state: {
        flightIds: string[],
        seats: ISeat[][]
    }
}

export const TicketContext = React.createContext<any>(null);

export default function TicketRegistrationForms() {
    const dispatch = useDispatch();
    const history = useHistory();
    const location: ILocation = useLocation();
    const { flightIds} = location.state;
    const [seats,setSeats] = React.useState<ISeat[][]>(location.state.seats);

    const [mappedForms, setMappedForms] = React.useState<object[]>([]);
    const filledFormsCount = React.useRef<number>(0);



    const changeSeat = React.useCallback((direction:number , seatIndex:number , passangerName:string) => {
        let newSeats = [...seats]
        newSeats[direction][seatIndex] = {...newSeats[direction][seatIndex] , passengerName:passangerName};
        setSeats(newSeats);
    },[seats]);


    const incrementCount = React.useCallback((n: number) => {
        filledFormsCount.current += n;
    }, []);


    React.useEffect(() => {
        setMappedForms(flightIds?.map((id, index) =>
            <SeatHoldersForm key={id} seats={seats[index]} direction={index} />))
    }, [flightIds, seats, changeSeat])
    

    const bookSeats = async (event: React.FormEvent<HTMLButtonElement>) => {
        event.preventDefault();

        const formsCount = seats?.reduce((acc: number, curr: ISeat[]) => {
            if (curr)
                return acc + curr.length;
            return acc;
        }, 0);

        if (filledFormsCount.current !== formsCount) {
            alert('Please fill and check all forms');
            return;
        }

        const result: any = await dispatch(requestCreateTickets({ flightIds, seats: seats }));

        if (result.type === requestCreateTickets.fulfilled.type) {
            history.push('/');
        }
    }

    return (
        <div className="center-horizontally">
            <div className="ticket-registration">
                <TicketContext.Provider value={{ incrementCount, changeSeat }}>
                    {mappedForms ? mappedForms : null}
                </TicketContext.Provider>
                <LoadingButton text="Purchase" onClick={bookSeats} loadingSelector={getIsCreatingTickets} />
            </div>
        </div>
    )
}