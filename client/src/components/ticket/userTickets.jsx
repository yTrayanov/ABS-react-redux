import React from 'react';
import {useSelector} from 'react-redux';

import {getUserId } from '../../store/authReducer';
import ticketService from '../../services/ticket.service';
import Ticket from './ticket';

export default function UserTickets(){

    const [tickets, setTickets] = React.useState([]);
    const userId = useSelector(getUserId);

    React.useEffect(() =>{
        ticketService.getUserTickets(userId)
                .then(response => response.json())
                .then(({data}) =>{
                    setTickets(data);
                })
                .catch(err => console.log(err))
    },[userId]);

    const parsedTickets = tickets?.map(t => <Ticket key={t.ticketId} ticket={t}/>)

    return(
        <>
            {parsedTickets ? parsedTickets : "There are no tickets" }
        </>
    )
}