import React from 'react';
import { useDispatch , useSelector } from 'react-redux';

import Ticket from './ticket';
import { requestUserTickets , getUserTickets } from '../../store/reducers/ticketsReducer';

export default function UserTickets(){
    const dispatch = useDispatch();
    const [mappedTickets, setMappedTickets] = React.useState([]);

    const tickets = useSelector(getUserTickets);
    
    React.useEffect(() =>{
        dispatch(requestUserTickets());
        setMappedTickets(tickets?.map(t => <Ticket key={t.ticketId} ticket={t}/>))
    },[tickets , dispatch]);

    return(
        <>
            {mappedTickets ? mappedTickets : "There are no tickets" }
        </>
    )
}