import React from 'react';
import { useDispatch , useSelector } from 'react-redux';

import Ticket from './ticket';

import { requestUserTickets , getUserTickets } from '../../store/reducers/ticketsReducer';
import ITicket from '../../interfaces/models/ticket.interface';




export default function UserTickets(){
    const dispatch = useDispatch();
    const [mappedTickets, setMappedTickets] = React.useState<any>([]);

    const tickets:ITicket[] = useSelector(getUserTickets);

    React.useEffect(() => {
        dispatch(requestUserTickets());
    }, [dispatch])
    

    React.useEffect(() =>{
        setMappedTickets(tickets?.map(t => <Ticket key={t.ticketId} ticket={t} />))
    },[tickets]);



    return(
        <>
            {mappedTickets ? mappedTickets : "There are no tickets" }
        </>
    )
}