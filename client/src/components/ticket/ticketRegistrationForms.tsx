import React from 'react';
import { useSelector , useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';

import SeatHoldersForm from './seatHoldersForm';

import ISeat from '../../interfaces/models/seat.interface';
import { getIsCreatingTickets,getSelectedSeats , requestCreateTickets } from '../../store/reducers/ticketsReducer';

export default function TicketRegistrationForms() {
    const location: any = useLocation();
    const dispatch = useDispatch();
    const flightIds: string[] = location.state;

    const [mappedForms, setMappedForms] = React.useState<any>();
    const [filledFormsCount, setFilledFormsCount] = React.useState<number>(0);

    const [seats, setSeats] = React.useState<any>(useSelector(getSelectedSeats));
    

    const changeSeats = React.useCallback((seats: ISeat[][]) => {
        setSeats(seats);
    }, [])


    const isLoading = useSelector<boolean>(getIsCreatingTickets);


    const incrementFilledFomrsCount = React.useCallback((n: number) => {
        setFilledFormsCount(c => c + n);
     }, []);

    React.useEffect(() => {
        setMappedForms(flightIds?.map((id, index) => <SeatHoldersForm key={id} incrementFilledFomrsCount={incrementFilledFomrsCount} changeSeats={changeSeats} currentSeats={seats[index] } index={index} allSeats={seats}/>))
    }, [flightIds,incrementFilledFomrsCount , changeSeats, seats])

 
    const bookSeats = React.useCallback((event:React.FormEvent<HTMLButtonElement>) => {
        event.preventDefault();

        const formsCount = seats?.reduce((acc:number , curr:any) => {
            if(curr)
                return acc + curr.length;
            return acc;
        } ,0);

        if (filledFormsCount === formsCount) {
            let index = 0;
            for(let id of flightIds){
                dispatch(requestCreateTickets(id, seats[index]));
                index++;
            }
        }
        else {
            alert('Please fill all fields');
        }

    }, [filledFormsCount, seats , dispatch , flightIds])
 

    return (
        <div className="center-horizontally">
            <div style={{width:'50%'}}>
                {mappedForms ? mappedForms : null}
                <button className="btn btn-primary btn-block" onClick={bookSeats} style={{ marginTop: "30px" }}>
                    {isLoading && <span className="spinner-border spinner-border-sm mr-1"></span>}
                    Purchase
                </button>
            </div>
        </div>
    )
}